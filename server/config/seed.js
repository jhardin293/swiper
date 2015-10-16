/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Note  = require('../api/note/note.model');
var thingMock = require('../mocks/things.mock.js')
var noteMock = require('../mocks/notes.mock.js')
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create(thingMock.data);
});

Note.find({}).remove(function() {
  Note.create(noteMock.data);
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
