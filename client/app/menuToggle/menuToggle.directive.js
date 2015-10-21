'use strict';

angular.module('fullTestApp')
  .directive('menuToggle', function ($timeout) {
    return {
      scope : {
        section : '='
      },
      templateUrl: 'app/menuToggle/menuToggle.html',
      link: function ($scope, $element) {
        var controller = $element.parent().controller();
        $scope.isOpen = function() {
          return controller.isDeckListOpen;
        };

        $scope.toggle = function() {
          //console.log('fired in dirct');
          controller.toggleDeckList();
        };
        $scope.$watch(
            function () {
              return $scope.isOpen();
            },
            function (open) {
              var $ul = $element.find('ul');
              $timeout(function () {
                $ul.css({ height: targetHeight + 'px' });
              }, 0, false);
              function getTargetHeight () {
                var targetHeight;
                $ul.addClass('no-transition');
                $ul.css('height', '');
                targetHeight = $ul.prop('clientHeight');
                $ul.css('height', 0);
                $ul.removeClass('no-transition');
                return targetHeight;
              }

              var targetHeight = open ? getTargetHeight() : 0;
            }
        );


        var parentNode = $element[0].parentNode.parentNode.parentNode;
        if(parentNode.classList.contains('parent-list-item')) {
          var heading = parentNode.querySelector('h2');
          $element[0].firstChild.setAttribute('aria-describedby', heading.id);
        }
      }
    };
  });
