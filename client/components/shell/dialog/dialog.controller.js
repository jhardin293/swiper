'use strict';

angular.module('fullTestApp')
  .controller('DialogController', function ($scope, $mdDialog, $http) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  $scope.addThing = function() {
    if($scope.newThing === '') {
      return;
    }
    $http.post('/api/notes', { front: $scope.newThing });
    $scope.newThing = '';
    $mdDialog.hide();
  };
});
