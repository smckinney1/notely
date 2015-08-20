'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('notely', [
  'ngRoute',        //component of Angular itself & is what manages the URL for us.
  'notely.notes',
  'notely.version'
]);

app.config(['$routeProvider', function($routeProvider) {      //$routeProvider object that Angular provides
  $routeProvider.otherwise({redirectTo: '/notes'});     //this is how it tells it what the default page is
}]);
