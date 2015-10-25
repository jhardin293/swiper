'use strict';

angular.module('fullTestApp')
  .controller('EditController', function ($scope, $mdDialog, $http, card) {
    $scope.note = card;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  $scope.editCard = function() {
    if($scope.note === '') {
      return;
    }
    $http.put('/api/notes/' + $scope.note._id, $scope.note);
    $mdDialog.hide();
  };
});
