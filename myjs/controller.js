var myapp = angular.module('myapp',['mydata']);

myapp.controller("loadDemo",['$scope','oriData',function($scope,oriData){
	$scope.demos = oriData;
}]);