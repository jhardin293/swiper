'use strict';

angular.module('fullTestApp')
  .directive('progressTracker', function () {
    return {
      restrict: 'EA',
      scope: {
        value: '=',
        maxValue: '='
      },
      link: function (scope, element) {
        var formatPercent = d3.format('.0%'),
            diameter = 150,
            ringThickness = 5,
            piSquared = 2 * Math.PI,
            margin = {left:20, right:40, top:10, bottom:10};

        var svg = d3.select(element[0]).append('svg')
            .attr('width', '100%')
            .attr('height','100%')
             .attr("viewBox","0 0 " + (margin.left + diameter + margin.right) +" " + (margin.top + diameter + margin.bottom) )
             .attr('preserveAspectRatio', 'xMidYMid meet')
          .append('g')
            .attr('transform', 'translate(' + (margin.left/2 + diameter - 60) +','+ (margin.top + diameter/2) +')');

        var arc = d3.svg.arc()
            .innerRadius(diameter/2)
            .outerRadius(diameter/2 - ringThickness)
            .startAngle(0);

        var background = svg.append('path')
            .style('fill', '#ddd')
            .attr('d', arc.endAngle(piSquared));

        var foreground = svg.append('path')
            .style('fill','#E2BC40')

        var numberText = svg.append('text')
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('font-size', '120%');

       scope.$watchGroup(['value', 'maxValue'],function(newVal){
         var value = newVal[0];
         var maxValue = newVal[1];
         var progress = value/maxValue;
         if(!isNaN(progress)){
           console.log(progress);
           foreground.attr('d', arc.endAngle(piSquared * progress));
           numberText.text(formatPercent(progress));
         }
       });
      }
    };
  });
