'use strict';
angular.module('fullTestApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.notes = [];

    $http.get('/api/notes').success(function(notes){
      $scope.notes = notes;
      socket.syncUpdates('note', $scope.notes);
    });

    var updateCounts = function () {
      $scope.sure = _.where($scope.notes, { understand: true, throwOut: true });
      $scope.unsure = _.where($scope.notes, { understand: false , throwOut: true});
      console.log('sure', $scope.sure.length, 'unsure', $scope.unsure.length);
    };

    $scope.throwOut = function (note, action) {
      note.throwOut = true;

      if(action === 'sure') {
        note.understand = true;
      }else{
        note.understand = false;
      }

      updateCounts();
    };

    $scope.toogleFlip = function (note) {
      note.clicked === true ? note.clicked = false : note.clicked = true;
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
