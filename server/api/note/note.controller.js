'use strict';

var _ = require('lodash');
var Note = require('./note.model');

// Get list of notes
exports.index = function(req, res) {
  Note.find(function (err, notes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(notes);
  });
};

// Get a single note
exports.show = function(req, res) {
  Note.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.status(404).send('Not Found'); }
    return res.json(note);
  });
};

// Creates a new note in the DB.
exports.create = function(req, res) {
  Note.create(req.body, function(err, note) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(note);
  });
};

// Updates an existing note in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Note.findById(req.params.id, function (err, note) {
    if (err) { return handleError(res, err); }
    if(!note) { return res.status(404).send('Not Found'); }
    var updated = _.merge(note, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(note);
    });
  });
};

// Deletes a note from the DB.
exports.destroy = function(req, res) {
  Note.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.status(404).send('Not Found'); }
    note.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}