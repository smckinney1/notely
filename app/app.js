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

//this directive, combined with the notes.html, will allow the cursor to focus in the note whenever New Note is clicked
app.directive('focusOn', function(){      //With Angular, in HTML directives must be all lowercase with hyphens, but when you call in JS it's camelCase
  return function(scope, el, attr) {      //el = element on the page that focusOn is on
    scope.$on(attr.focusOn, function(ev) {
      el[0].focus();
    });
  };
});
