(function() {
  angular.module('Keyboard')
    .factory('WebAudioAPI', WebAudioAPI);

  WebAudioAPI.$inject = ['Pitch', 'WaveShapes', 'Delay'];

  function WebAudioAPI(Pitch, WaveShapes, Delay) {
    var service = {},
      audioContext = window.AudioContext || window.webkitAudioContext,
      context = new audioContext(),
      tuna = new Tuna(context);

    service.context = context;
    service.newOscillator = newOscillator;

    return service;

    // hoisted functions
    function newOscillator(note) {
      var osc = context.createOscillator(),
        gain = context.createGain(),
        delay = new tuna.Delay(Delay.params);

      gain.gain.value = 0;

      osc.gainNode = gain;
      osc.type = WaveShapes.selected;
      osc.frequency.value = Pitch.getFreq(note);

      osc.connect(gain);
      gain.connect(delay);
      delay.connect(context.destination);

      osc.start();

      return osc;
    }
  }
}());
