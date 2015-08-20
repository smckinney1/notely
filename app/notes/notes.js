'use strict';

angular.module('notely.notes', ['ngRoute'])   //notes module. below is chained onto it, technically

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {     //when the URL is /notes, pass in some options
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', [function() {

}]);
