'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/',
    apiKey = '$2a$10$C4PczP818rSDjW84gByiaOkgTqT2fV4u4f5TtggnFXyK3KQwFjUK.';

angular.module('notely.notes', ['ngRoute'])   //notes module. below is chained onto it, technically

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {     //when the URL (route) is /notes, pass in some options
    templateUrl: 'notes/notes.html'
  });
}])

.controller('NotesController', ['$scope', '$http', function($scope, $http) {    //In this case we have to put the objects as strings before the function
  $scope.note = {};                                                         //setting $scope.note to an empty object

  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)			//creates the URL for a specific note
    .success(function(notesData) {			 //notesData will be the data from all the notes
      $scope.notes = notesData;
    });

$scope.commit = function() {
   $http.post(nevernoteBasePath + 'notes', {
     api_key: apiKey,
     note: $scope.note
   }).success(function(newNoteData) {
     $scope.notes.unshift(newNoteData.note);      //adds item to beginning of array instead of the end (which push would do)
   });
 };
}]);
