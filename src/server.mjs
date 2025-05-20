import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './controllers/routes.mjs';
import https from 'https';
import selfsigned from 'selfsigned';
import fs from 'fs';
import path from 'path';
import config from './config.mjs';

const Server = class Server {
  constructor(customConfig = {}) {
    const env = process.env.NODE_ENV || 'development';
    const configFromFile = config[env];
    this.config = { ...configFromFile, ...customConfig };
    this.app = express();
  }

  generateCertificate() {
    const certPath = path.join(process.cwd(), 'cert');
    const keyFile = path.join(certPath, 'key.pem');
    const certFile = path.join(certPath, 'cert.pem');
    
    let key, cert;
    
    try {
      if (fs.existsSync(keyFile) && fs.existsSync(certFile)) {
        console.log('[SECURITY] Certificats existants trouvés, utilisation...');
        key = fs.readFileSync(keyFile, 'utf8');
        cert = fs.readFileSync(certFile, 'utf8');
      } else {
        console.log('[SECURITY] Génération de nouveaux certificats auto-signés...');

        if (!fs.existsSync(certPath)) {
          fs.mkdirSync(certPath, { recursive: true });
        }
        
        const attrs = [{ name: 'commonName', value: 'localhost' }];
        const pems = selfsigned.generate(attrs, { days: 365 });
        
        key = pems.private;
        cert = pems.cert;
        
        fs.writeFileSync(keyFile, key);
        fs.writeFileSync(certFile, cert);
        console.log('[SECURITY] Nouveaux certificats générés et sauvegardés');
      }
      
      return { key, cert };
    } catch (err) {
      console.error(`[ERROR] Problème avec les certificats: ${err}`);
      throw err;
    }
  }

  async dbConnect() {
    try {
      const host = this.config.mongodb;

      this.connect = await mongoose.createConnection(host, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const close = () => {
        this.connect.close((error) => {
          if (error) {
            console.error('[ERROR] api dbConnect() close() -> mongodb error', error);
          } else {
            console.log('[CLOSE] api dbConnect() -> mongodb closed');
          }
        });
      };

      this.connect.on('error', (err) => {
        setTimeout(() => {
          console.log('[ERROR] api dbConnect() -> mongodb error');
          this.connect = this.dbConnect(host);
        }, 5000);

        console.error(`[ERROR] api dbConnect() -> ${err}`);
      });

      this.connect.on('disconnected', () => {
        setTimeout(() => {
          console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected');
          this.connect = this.dbConnect(host);
        }, 5000);
      });

      process.on('SIGINT', () => {
        close();
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection');
        process.exit(0);
      });

      return this.connect;
    } catch (err) {
      console.error(`[ERROR] api dbConnect() -> ${err}`);
      throw err;
    }
  }

  middleware() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        status: 405,
        message: 'Trop de requêtes, veuillez réessayer après une heure'
      }
    });

    this.app.use(limiter);

    this.app.use(compression());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  routes() {
    routes.init(this.app, this.connect);

    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: 'Not Found'
      });
    });
  }

  security() {
    this.app.use(helmet());
    this.app.disable('x-powered-by');
  }

  async run() {
    try {
      await this.dbConnect();

      this.security();
      this.middleware();
      this.routes();

      const { key, cert } = this.generateCertificate();

      const httpsOptions = {
        key: key,
        cert: cert
      };

      const server = https.createServer(httpsOptions, this.app);
      
      server.listen(this.config.port, () => {
        console.log(`[SERVER] HTTPS en cours d'exécution sur le port ${this.config.port} en mode ${this.config.type}`);
        console.log(`[SERVER] Accès: https://localhost:${this.config.port}`);
      });
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`);
      throw err;
    }
  }
};

export default Server;