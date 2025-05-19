class Albums {
  constructor(app, model) {
    this.app = app;
    this.model = model;

    this.initRoutes();
  }

  initRoutes() {
    this.app.get('/albums', this.getAllAlbums.bind(this));
    this.app.get('/albums/:id', this.getAlbumById.bind(this));
    this.app.post('/albums', this.createAlbum.bind(this));
    this.app.put('/albums/:id', this.updateAlbum.bind(this));
    this.app.delete('/albums/:id', this.deleteAlbum.bind(this));
    this.app.post('/albums/:id/photos', this.addPhotoToAlbum.bind(this));
    this.app.delete('/albums/:id/photos/:photoId', this.removePhotoFromAlbum.bind(this));
  }

  async getAllAlbums(req, res) {
    try {
      const albums = await this.model.find({}).populate('photos');
      return res.json(albums);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async getAlbumById(req, res) {
    try {
      const album = await this.model.findById(req.params.id).populate('photos');

      if (!album) {
        return res.status(404).json({
          code: 404,
          message: 'Album non trouvé'
        });
      }

      return res.json(album);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async createAlbum(req, res) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({
          code: 400,
          message: 'Le titre est requis'
        });
      }

      // eslint-disable-next-line new-cap
      const newAlbum = new this.model({
        title,
        description,
        photos: []
      });

      const savedAlbum = await newAlbum.save();
      return res.status(201).json(savedAlbum);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async updateAlbum(req, res) {
    try {
      const { title, description } = req.body;
      const updateData = {};

      if (title) updateData.title = title;
      if (description !== undefined) updateData.description = description;

      const updatedAlbum = await this.model.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedAlbum) {
        return res.status(404).json({
          code: 404,
          message: 'Album non trouvé'
        });
      }

      return res.json(updatedAlbum);
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async deleteAlbum(req, res) {
    try {
      const deletedAlbum = await this.model.findByIdAndDelete(req.params.id);

      if (!deletedAlbum) {
        return res.status(404).json({
          code: 404,
          message: 'Album non trouvé'
        });
      }

      return res.json({
        code: 200,
        message: 'Album supprimé avec succès',
        id: deletedAlbum.id
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async addPhotoToAlbum(req, res) {
    try {
      const { photoId } = req.body;

      if (!photoId) {
        return res.status(400).json({
          code: 400,
          message: 'L\'ID de la photo est requis'
        });
      }

      const album = await this.model.findById(req.params.id);

      if (!album) {
        return res.status(404).json({
          code: 404,
          message: 'Album non trouvé'
        });
      }

      // Vérifier si la photo est déjà dans l'album
      if (album.photos.includes(photoId)) {
        return res.status(400).json({
          code: 400,
          message: 'La photo est déjà dans cet album'
        });
      }

      album.photos.push(photoId);
      await album.save();

      return res.json({
        code: 200,
        message: 'Photo ajoutée à l\'album avec succès',
        album
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: 'Erreur interne du serveur',
        error: err.message
      });
    }
  }

  async removePhotoFromAlbum(req, res) {
    try {
      const album = await this.model.findById(req.params.id);

      if (!album) {
        return res.status(404).json({
          code: 404,
          message: 'Album non trouvé'
        });
      }

      const photoIndex = album.photos.indexOf(req.params.photoId);

      if (photoIndex === -1) {
        return res.status(404).json({
          code: 404,
          message: 'Photo non trouvée dans cet album'
        });
      }

      album.photos.splice(photoIndex, 1);
      await album.save();

      return res.json({
        code: 200,
        message: 'Photo retirée de l\'album avec succès',
        album
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

export default Albums;
