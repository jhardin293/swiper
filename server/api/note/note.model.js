'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  front: String,
  back: String,
  understand: Boolean,
  links: [String]
});

module.exports = mongoose.model('Note', NoteSchema);
