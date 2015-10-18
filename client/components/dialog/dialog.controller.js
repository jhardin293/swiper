'use strict';

angular.module('fullTestApp')
  .controller('DialogController', function ($scope, $mdDialog, $http) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  $scope.addThing = function() {
    if($scope.note === '') {
      return;
    }
    $http.post('/api/notes', $scope.note);
    console.log($scope.note);
    $mdDialog.hide();
  };
});
