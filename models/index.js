var mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = mongoose.model(
    'image',
    mongoose.Schema({
      imageUrl: String
    })
);

module.exports = Image;