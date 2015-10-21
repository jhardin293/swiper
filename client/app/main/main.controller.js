'use strict';
angular.module('fullTestApp')
  .controller('MainCtrl', function ($scope, $interval,
  $http, socket, $mdDialog, $mdMedia) {

    $scope.$watch(function() { return $mdMedia('gt-md'); }, function(md) {
      $scope.sideBar = md;
    });

    $scope.toogleSideBar = function () {
      if ($scope.sideBar === true) {
        $scope.sideBar = false;
      }else {
        $scope.sideBar = true;
      }
    };

    // Methods used by menuToggle directive
    var isDeckListOpen = true;
    function toggleDeckList () {
      if (isDeckListOpen === true) {
        isDeckListOpen = false;
      }else {
        isDeckListOpen = true;
      }
      this.isDeckListOpen = isDeckListOpen;
    }
    this.isDeckListOpen = isDeckListOpen;
    this.toggleDeckList = toggleDeckList;

    //For deck list in side nave
    $scope.decks = {
      name : 'Decks',
      pages: [
        { name: 'Javascript'},
        { name: 'HTML'},
        { name: 'CSS'},
      ]
    };

    $scope.notes = [];
    $http.get('/api/notes').success(function(notes){
      $scope.notes = notes;
      socket.syncUpdates('note', $scope.notes);
    });

    $scope.cardView = true;
    $scope.listView = false;
    $scope.listViewOn = function () {
      if (!$scope.listView) {
        $scope.listView = true;
        $scope.cardView = false;
      }else{
        $scope.listView = false;
        $scope.cardView = true;
      }
    };

    var updateCounts = function () {
      $scope.sure = _.where($scope.notes, { understand: true, throwOut: true });
      $scope.unsure = _.where($scope.notes, { understand: false , throwOut: true});
      console.log('sure', $scope.sure.length, 'unsure', $scope.unsure.length);
    };


    //Used for swip dirictive
    this.itemCount = 0;
    this.activeItem = null;

    this.addItem = function(){
      var newId = this.itemCount++;
      this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
      return newId;
    };

    this.throwOut = function (note, action) {
      note.throwOut = true;
      if(action === 'prev') {
        note.understand = true;
      }else if (action === 'next') {
        note.understand = false;
      }

      updateCounts();
    };

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
