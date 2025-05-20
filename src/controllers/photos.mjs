import Validator from 'better-validator';

class Photos {
  constructor(app, model) {
    this.app = app;
    this.model = model;

    this.initRoutes();
  }

  initRoutes() {
    this.app.get('/photos', this.getAllPhotos.bind(this));
    this.app.get('/photos/:id', this.getPhotoById.bind(this));
    this.app.post('/photos', this.createPhoto.bind(this));
    this.app.put('/photos/:id', this.updatePhoto.bind(this));
    this.app.delete('/photos/:id', this.deletePhoto.bind(this));
  }

  async getAllPhotos(req, res) {
    try {
      const photos = await this.model.find({});
      return res.json(photos);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async getPhotoById(req, res) {
    try {
      const photo = await this.model.findById(req.params.id);

      if (!photo) {
        return res.status(404).json({
          code: 404,
          message: 'Photo non trouvée'
        });
      }

      return res.json(photo);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async createPhoto(req, res, next) {
    try {
      const {
        title, url, description, albums
      } = req.body;

      const validator = new Validator();

      validator(req.body.title).required().isString().lengthInRange(1, 20);
      validator(req.body.url).isString().lengthInRange(1, 500);
      validator(req.body.albums).isArray().lengthInRange(1, 200);
      const errors = validator.run();

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: 'probléme de validation',
          errors: validator.errors
        })};

      const NewPhoto = new this.model({
        title,
        url,
        description,
        albums
      });

      await NewPhoto.save();

      return res.status(201).json({
        code: 201,
        message: 'Photo créée avec succès',
        data: NewPhoto
      });
    } catch (error) {
      return next(error);
    }
  }

  async updatePhoto(req, res, next) {
    try {
      const {
        title, url, description, albums
      } = req.body;
      const updateData = {};

      // Collecte uniquement les champs fournis pour la mise à jour
      if (title !== undefined) updateData.title = title;
      if (url !== undefined) updateData.url = url;
      if (description !== undefined) updateData.description = description;
      if (albums !== undefined) updateData.albums = albums;

      // Vérifier s'il y a des données à mettre à jour
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          code: 400,
          message: 'Aucune donnée fournie pour la mise à jour'
        });
      }
      // Création du validateur
      const validator = new Validator();
      validator(req.body.title).required().isString().lengthInRange(1, 20);
      validator(req.body.url).isString().lengthInRange(1, 500);
      validator(req.body.albums).isArray().lengthInRange(1, 200);
      const errors = validator.run();

      if (errors.length > 0) {
        return res.status(44).json({
          code: 404,
          message: 'probléme de validation',
          errors: validator.errors
        });
      }


      // Mise à jour de la photo
      const updatedPhoto = await this.model.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedPhoto) {
        return res.status(404).json({
          code: 404,
          message: 'Photo non trouvée'
        });
      }

      return res.json({
        code: 200,
        message: 'Photo mise à jour avec succès',
        data: updatedPhoto
      });
    } catch (err) {
      return next(err);
    }
  }

  async deletePhoto(req, res) {
    try {
      const deletedPhoto = await this.model.findByIdAndDelete(req.params.id);

      if (!deletedPhoto) {
        return res.status(404).json({
          code: 404,
          message: 'Photo non trouvée'
        });
      }

      return res.json({
        code: 200,
        message: 'Photo supprimée avec succès',
        id: deletedPhoto.id
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }
}

export default Photos;
