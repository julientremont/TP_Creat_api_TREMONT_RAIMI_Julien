import ServerClass from './src/server.mjs';

const server = new ServerClass();
server.run()
  .then(() => {
    console.log(`[SERVER] En cours d'exécution sur le port ${server.config.port} en mode ${server.config.type}`);
  })
  .catch(err => {
    console.error('[SERVER] Échec du démarrage:', err);
  });
  