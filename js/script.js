var app = angular.module('witness', []);
app.controller('Main',['$scope', function ($scope) {
  $scope.points = [];

  for (var i = 0; i < 81; i++) {
    $scope.points.push({ active: false, sides: { north: false, south: false, east: false, west: false } });
  }

  $scope.getPointClasses = function(point) {
    var klasses = [];

    if (point.sides.north) {
      klasses.push("north-active");
    }

    if (point.sides.south) {
      klasses.push("south-active");
    }

    if (point.sides.east) {
      klasses.push("east-active");
    }

    if (point.sides.west) {
      klasses.push("west-active");
    }

    if (point.active) {
      klasses.push("main-active");
    }

    return klasses.join(' ');
  };

  $scope.digestPoint = function(point) {
    $scope.$digest();
  };
}]);

app.directive('witPoint', function () {
  var linkFunction = function ($scope, element, attrs) {
    
    element.on('click', function(e) {
      var position = element.position();
      var offset = { top: e.pageY - position.top, left: e.pageX - position.left };

      // handle toggling of the sides
      // handle similar sides (neighbor sides)
      // handle outer edges

      if (offset.top <= 10) {
        $scope.witPoint.sides.north = !$scope.witPoint.sides.north;
      }
      if (offset.left <= 10) {
        $scope.witPoint.sides.west = !$scope.witPoint.sides.west;
      }
      if (offset.left > 10 && offset.top > 10) {
        $scope.witPoint.active = !$scope.witPoint.active;
      }

      $scope.witCallback($scope.witPoint);

    });
  };
  var directiveDefinitionObject = {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: {
      witPoint: '='
      , witCallback: '='
    },
    link: linkFunction
  };
  return directiveDefinitionObject;
});