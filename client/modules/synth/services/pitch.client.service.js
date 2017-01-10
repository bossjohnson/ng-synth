(function() {
  angular.module('Synth')
    .factory('Pitch', Pitch);

  function Pitch() {
    var service = {},
      a = Math.pow(2, 1 / 12),
      f0 = 440, // A4 (440 Hz)
      noteNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
      notes = [];

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < noteNames.length; j++) {
        notes.push(noteNames[j] + i);
      }
    }

    service.notes = notes;
    service.getFreq = getFreq;

    return service;

    function getFreq(note) {
      // fn = f0 * a^n
      var noteIndex = notes.indexOf(note),
        baseIndex = notes.indexOf('a4'),
        n = noteIndex - baseIndex,
        freq = f0 * Math.pow(a, n);

      return freq;
    }


  }
}());
