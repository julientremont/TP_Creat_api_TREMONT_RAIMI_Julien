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

  async createPhoto(req, res) {
    try {
      const {
        title, url, description, albums
      } = req.body;

      if (!title) {
        return res.status(400).json({
          code: 400,
          message: 'Le titre est requis'
        });
      }

      // eslint-disable-next-line new-cap
      const newPhoto = new this.model({
        title,
        url,
        description,
        albums
      });

      const savedPhoto = await newPhoto.save();
      return res.status(201).json(savedPhoto);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async updatePhoto(req, res) {
    try {
      const {
        title, url, description, albums
      } = req.body;
      const updateData = {};

      if (title) updateData.title = title;
      if (url !== undefined) updateData.url = url;
      if (description !== undefined) updateData.description = description;
      if (albums !== undefined) updateData.albums = albums;

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

      return res.json(updatedPhoto);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
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
