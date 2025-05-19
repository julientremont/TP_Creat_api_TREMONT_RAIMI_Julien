import mongoose from 'mongoose';

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

export default (connection) => connection.model('Photo', PhotoSchema);
