(function() {
  angular.module('Keyboard')
    .factory('KeyboardRange', KeyboardRange);

  KeyboardRange.$inject = ['Pitch'];

  function KeyboardRange(Pitch) {
    var service = {
      bottom: 0,
      top: 107,
      getKeys: getKeys
    };

    return service;

    // hoisted functions
    function getKeys(bottom, top) {
      var keys = {},
        notes = Pitch.notes.filter(noteFilter),
        white = notes.filter(whiteFilter),
        black = notes.filter(blackFilter);

      keys.white = white;
      keys.black = black;

      return keys;

      function noteFilter(note) {
        var index = Pitch.notes.indexOf(note);
        return index >= bottom && index <= top;
      }

      function whiteFilter(note) {
        return note.indexOf('#') < 0;
      }

      function blackFilter(note) {
        return note.indexOf('#') >= 0;
      }
    }
  }
}());
