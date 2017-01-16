(function() {
  angular.module('Keyboard')
    .factory('Keyboard', Keyboard);

  Keyboard.$inject = ['Pitch'];

  function Keyboard(Pitch) {
    var service = {
      keys: getKeys()
    };

    return service;

    // hoisted functions
    function getKeys() {
      var keys = {},
        notes = Pitch.notes,
        white = notes.filter(whiteFilter),
        black = notes.filter(blackFilter);

      keys.white = white;
      keys.black = black;

      return keys;
    }

    function whiteFilter(note) {
      return note.indexOf('#') < 0;
    }

    function blackFilter(note) {
      return note.indexOf('#') >= 0;
    }
  }
}());
