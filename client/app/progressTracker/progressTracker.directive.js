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
        var formatPercent = d3.format('.0%');
        var width = 500,
            height = 500,
            piSquared = 2 * Math.PI;

        var svg = d3.select(element[0]).append('svg')
            .attr('width', width)
            .attr('height', height)
          .append('g')
            .attr('transform', 'translate(' + width/2 +','+ height/2 +')');

        var arc = d3.svg.arc()
            .innerRadius(180)
            .outerRadius(200)
            .startAngle(0);

        var background = svg.append('path')
            .style('fill', '#ddd')
            .attr('d', arc.endAngle(piSquared));

        var foreground = svg.append('path')
            .style('fill','orange')

        var numberText = svg.append('text')
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('font-size', '190%');

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
