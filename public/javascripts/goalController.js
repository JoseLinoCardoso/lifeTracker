angular.module('goalController', [])
.controller('goalCtrl', function($scope, $http, Goals) {
  Goals.get().success(function(data) {
    for (var currentIndex=0; currentIndex<data.length; currentIndex=currentIndex+1) {
      var currentElement = data[currentIndex];
      currentElement.percentage = currentIndex*10;
    }
    $scope.goals = data;
  });
  $scope.addGoal = function() {
    if(!$scope.goalName || $scope.goalName === '') { return; }
    var goalObject = {
      description: $scope.goalName
    };
    Goals.create(goalObject).success(function(data) {
      data.percentage = 0;
      $scope.goals.push(data);
      $scope.goalName = '';
    });
  };
  $scope.removeGoal = function(goal) {
    Goals.delete(goal._id).success(function(data) {
      var index = $scope.goals.indexOf(goal);
      $scope.goals.splice(index, 1);
    });
  };
});
