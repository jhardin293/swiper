'use strict';
angular.module('fullTestApp')
  .controller('MainCtrl', function ($scope, $interval,
  $http, socket, $mdDialog, $mdMedia) {

    $scope.sideBar = $mdMedia('gt-md');

    $scope.toogleSideBar = function () {
      if ($scope.sideBar === true) {
        $scope.sideBar = false;
      }else {
        $scope.sideBar = $mdMedia('gt-md');
      }
    };

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

    // var promise;
    // $scope.mouseDown = function (e) {
    //   console.log('mouseDown');
    //   var i = 0;
    //   promise = $interval(function() {
    //   //var transform = e.target.parentNode;
    //   var transform = angular.element(e.target).parent();
    //    console.log(transform,++i);
    //   },100)
    // };

    // $scope.mouseUp = function () {
    //   $interval.cancel(promise);
    //   console.log('mouseUp');
    // };

    $scope.toogleFlip = function (note) {
      note.clicked === true ? note.clicked = false : note.clicked = true;
    };

    $scope.showAddDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'components/dialog/dialog.html',
        controller: 'DialogController'
      });
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
