(function() {
  angular.module('Keyboard')
    .factory('WebAudioAPI', WebAudioAPI);

  WebAudioAPI.$inject = ['Pitch', 'WaveShapes'];

  function WebAudioAPI(Pitch, WaveShapes) {
    var service = {},
      audioContext = window.AudioContext || window.webkitAudioContext,
      context = new audioContext();

    service.context = context;
    service.newOscillator = newOscillator;

    return service;

    // hoisted functions
    function newOscillator(note) {
      var osc = context.createOscillator(),
        gain = context.createGain();

      gain.gain.value = 0;

      osc.gainNode = gain;
      osc.type = WaveShapes.selected;
      osc.frequency.value = Pitch.getFreq(note);

      osc.connect(gain);
      gain.connect(context.destination);

      osc.start();

      return osc;
    }
  }
}());
