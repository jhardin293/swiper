/*jshint -W109 */
'use strict';

angular.module('fullTestApp')
  .directive('swipeItem', function ($drag) {
    return {
      restrict: 'EA',
      scope: {
        note : '='
      },
      link: function (scope, element, attrs) {
        var startX = null,
            startY = null,
            endAction = 'cancel';

        var controller = element.parent().controller();
        scope.controller = controller;

        var id = controller.addItem();

        var zIndex = function(){
          var res = 0;
          if (id === controller.activeItem){
            res = 2000;
          } else if (controller.activeItem < id) {
            res = 2000 - (id - controller.activeItem);
          } else {
            res = 2000 - (controller.itemCount - 1 - controller.activeItem + id);
          }
          return res;
        };

        scope.$watch(function(){
          return controller.activeItem;
        }, function(){
          element[0].style.zIndex = zIndex();
        });

        $drag.bind(element, {
          transform: function(ele, transform, touch) {
            var t = $drag.TRANSLATE_BOTH(ele, transform, touch);

            var Dx    = touch.distanceX,
                t0    = touch.startTransform,
                sign  = Dx < 0 ? -1 : 1,
                angle = sign * Math.min( ( Math.abs(Dx) / 700 ) * 30 , 30 );
            t.rotateZ = angle + (Math.round(t0.rotateZ));
            return t;
          },
          start: function(drag) {
            startX = drag.x;
            startY = drag.y;
          },
          move: function(drag){
            var deltaX = drag.x - startX;
            var deltaXRatio = deltaX /element[0].clientWidth;
            if (deltaXRatio > 0.3) {
              endAction = 'next';
            }else if (deltaXRatio < -0.3) {
              endAction = 'prev';
            }
            if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
              element.addClass('dismiss');
            } else {
              element.removeClass('dismiss');
            }

          },
          cancel: function(){
            element.removeClass('dismiss');
          },
          end: function(drag) {
            element.removeClass('dismiss');
            console.log(endAction);
            if(endAction === 'prev') {
              scope.$apply(function() {
                controller.throwOut(scope.note, endAction);
              });
            }else if (endAction === 'next'){
              scope.$apply(function() {
                controller.throwOut(scope.note, endAction);
              });
            }
            drag.reset();
          }
        });

      }
    };
  });
