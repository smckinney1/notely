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
  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)			//creates the URL for a specific note
    .success(function(notesData) {			 //notesData will be the data from all the notes
      $scope.notes = notesData;
    });
  $scope.commit = function() {      //referring to commit in notes.html. We're sending the note to the server.
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note:  {
        title: 'The magic of AngularJS',
        body_html: 'Whoever wrote this API must be a person.'
      }
    }).success(function (newNoteData) {
      console.log("SAVED");
      console.log(newNoteData);
    });
  };
}]);
