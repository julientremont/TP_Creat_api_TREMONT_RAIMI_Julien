import mongoose from 'mongoose';
import Validator from 'better-validator';

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  albums: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: false
  },
  created_At: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'photos',
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

PhotoSchema.pre('save', function validatePhoto(next) {
  const photo = this;
  const validator = new Validator();

  validator.addValidation(photo, 'title', 'required|string|min:1|max:20');
  validator.addValidation(photo, 'url', 'string|min:1|max:500');
  validator.addValidation(photo, 'albums', 'array|min:1|max_len:100');
  validator.addValidation(photo, 'created_At', 'date');

  const errors = validator.validate();

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => `${error.field}: ${error.message}`);
    const errorMessage = errorMessages.join(', ');
    return next(new Error(errorMessage));
  }

  // Suppression du else inutile après return
  return next();
});

export default (connection) => connection.model('Photo', PhotoSchema);
