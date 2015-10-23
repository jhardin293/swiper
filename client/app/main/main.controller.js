'use strict';
angular.module('fullTestApp')
  .controller('MainCtrl', function ($scope, $interval,
  $http, socket, $mdDialog, $mdMedia) {
    $scope.sideBarLocked = true;
    $scope.$watch(function() { return $mdMedia('gt-md'); }, function(md) {
      $scope.sideBar = md;
      $scope.sideBarLocked = md;
      console.log(md);
    });

    $scope.toogleSideBar = function () {
      if($mdMedia('gt-md') === true){
        if ($scope.sideBar === true) {
          console.log('gt md false if');
          $scope.sideBar = false;
          $scope.sideBarLocked = false;
        }else {
          console.log('gt md false else');
          $scope.sideBarLocked = true;
          $scope.sideBar = true;
        }
      }else {
        if ($scope.sideBar === true) {
          console.log('gt md true if ');
          $scope.sideBar = false;
        }else {
          console.log('gt md true if ');
          $scope.sideBar = true;
        }
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

    $scope.deleteNote = function (note) {
      console.log(note._id);
      $http.delete('/api/notes/'+ note._id);
    };

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

    $scope.reset = function () {
      _.each($scope.notes, function(note, i){
        console.log(i);
        delete $scope.notes[i].understand;
        $scope.notes[i].throwOut = false;
      })
      updateCounts();
    }



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
        note.understand = false;
      }else if (action === 'next') {
        note.understand = true;
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
