import mongoose from 'mongoose';
import Validator from 'better-validator';

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  created_At: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'albums',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
    return retUpdated;
  }
});

AlbumSchema.pre('save', function validateAlbum(next) {
  const album = this;
  const validator = new Validator();
  validator.addValidation(album, 'title', 'required|string|min:1|max:20');
  validator.addValidation(album, 'description', 'string|min:1|max:500');
  validator.addValidation(album, 'photos', 'array|min:1|max_len:100');
  validator.addValidation(album, 'created_At', 'date');
  const errors = validator.validate();
  if (errors.length > 0) {
    const errorMessages = errors.map((error) => `${error.field}: ${error.message}`);
    const errorMessage = errorMessages.join(', ');
    return next(new Error(errorMessage));
  }
  return next();
});

export default (connection) => connection.model('Album', AlbumSchema);
