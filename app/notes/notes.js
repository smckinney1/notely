'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/',
    apiKey = '$2a$10$C4PczP818rSDjW84gByiaOkgTqT2fV4u4f5TtggnFXyK3KQwFjUK.',
    noteApp = angular.module('notely.notes', ['ngRoute']);   //notes module. below is chained onto it, technically

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {     //when the URL (route) is /notes, pass in some options
    templateUrl: 'notes/notes.html'
  });
}]);

var noteApp = angular.module('notely.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  });
}]);

noteApp.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {
  var self = this;
  $scope.note = {};
  $scope.notes = [];

  self.assignNotes = function(notes) {
    $scope.notes = notes;
  };

  self.findNoteById = function(noteId) {
    for(var i = 0; i < $scope.notes.length; i++) {
      if ($scope.notes[i].id === noteId) {
        return $scope.notes[i];
      }
    }
  };

  self.cloneNote = function(note) {
    return JSON.parse(JSON.stringify(note));  //Complicated way of cloning objects in JS...have to do this
  };

  $scope.commit = function() {
    NotesBackend.postNote($scope.note, self.assignNotes);
  };

  $scope.hasNotes = function () {
    return $scope.notes.length > 0;       //if self.notes.length >0, it'll return true...aka show the sidebar
  };

  $scope.loadNote = function(note) {
    $scope.note = self.cloneNote(note);
  };

  NotesBackend.fetchNotes(self.assignNotes);
}]);
