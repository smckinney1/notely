//this module will be a service module, which has a piece of responsibility that you want to offload, ex: talking to the api_key
'use strict';

app.service('NotesBackend', ['$http', function NotesBackend($http) {
  var self = this;
  var notes = [];

  self.getNotes = function() {        //when you define a function this way, it becomes a method (using the self. syntax)
    return notes;
  };

//get the notes from the API
  self.fetchNotes = function(callback) {
    $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
      .success(function(notesData) {
        notes = notesData;
        callback(notes, {});      //it's running assignNotes here...
      });
      return notes;
  };

  self.postNote = function(noteData, callback) {
    //Post a new note to the API
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
      notes.unshift(newNoteData.note);
      callback(notes, newNoteData.note);      //gets the array of all of the notes
    });
  };

  self.putNote = function(noteData, callback) {
    //Post a new note to the API
    $http.put(nevernoteBasePath + 'notes/' + noteData.id, {
      api_key: apiKey,
      note: noteData
    }).success(function(updatedNoteData) {
      self.replaceNote(updatedNoteData.note, callback);
    });
  };

//delete note from API
self.deleteNote = function(noteData, callback) {
 $http.delete(
   nevernoteBasePath + 'notes/' + noteData.id +
   '?api_key=' + apiKey
 ).success(function(updatedNoteData) {
   self.removeNote(noteData.id, callback);
 });
};

  self.replaceNote = function(updatedNoteData, callback) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === updatedNoteData.id) {
        notes[i] = updatedNoteData;
        callback(notes, updatedNoteData);
        return updatedNoteData;
      }
    }
  };

//remove note from the array after deleting from API
  self.removeNote = function(id, callback) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        notes.splice(i, 1);
        callback(notes, {});
        return {};
      }
    }
  };

}]);
