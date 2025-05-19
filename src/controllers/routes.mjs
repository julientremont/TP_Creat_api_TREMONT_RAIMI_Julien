import PhotoModel from '../models/photo.mjs';
import AlbumModel from '../models/album.mjs';
import Photos from './photos.mjs';
import Albums from './albums.mjs';

export default {
  init(app, connection) {
    // Créer les modèles avec la connexion
    const PhotosModel = PhotoModel(connection);
    const AlbumsModel = AlbumModel(connection);

    // Initialiser les contrôleurs avec les modèles
    new Photos(app, PhotosModel);
    new Albums(app, AlbumsModel);
  }
};
