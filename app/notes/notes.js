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

  self.assignNotes = function(notes, note) {
    $scope.notes = notes;
    $scope.note = JSON.parse(JSON.stringify(note));
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

  $scope.buttonText = function() {
    if ($scope.note.id) {
      return "Update Note";
    }  else {
      return "Create Note";
    }
  };

  $scope.commit = function() {
    if ($scope.note.id) {       //if there is an ID update existing note
      NotesBackend.putNote($scope.note, self.assignNotes);
    }  else {
      NotesBackend.postNote($scope.note, self.assignNotes);   //otherwise create a new note
    }
  };

  $scope.deleteNote = function() {
    NotesBackend.deleteNote($scope.note, function(notes, note) {
      self.assignNotes(notes, note);
      $scope.clearNote();
    });
  };

  $scope.hasNotes = function () {
    return $scope.notes.length > 0;       //if self.notes.length >0, it'll return true...aka show the sidebar
  };

  $scope.loadNote = function(note) {
    $scope.note = self.cloneNote(note);
    $scope.$broadcast('noteLoaded');      //will focus mouse cursor in message body when clicking an existing note to edit
  };

  $scope.clearNote = function() {       //making a new note while you're in an old one. It'll replace Edit form w/ New note form
    $scope.note = {};
    $scope.$broadcast('noteCleared');              //broadcasting a message from one Angular module to another
  };

  NotesBackend.fetchNotes(self.assignNotes);
}]);
