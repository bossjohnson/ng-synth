(function() {
  angular.module('Keyboard')
    .factory('WebAudioAPI', WebAudioAPI);

  WebAudioAPI.$inject = ['Pitch', 'WaveShapes', 'Delay', 'Chorus'];

  function WebAudioAPI(Pitch, WaveShapes, Delay, Chorus) {
    var service = {},
      audioContext = window.AudioContext || window.webkitAudioContext,
      context = new audioContext(),
      tuna = new Tuna(context),
      delay = new tuna.Delay(Delay.params),
      chorus = new tuna.Chorus(Chorus.params);

    service.context = context;
    service.delay = delay;
    service.chorus = chorus;

    service.newOscillator = newOscillator;
    service.updateParams = updateParams;

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
      gain.connect(chorus);
      chorus.connect(delay);
      delay.connect(context.destination);

      osc.start();

      return osc;
    }

    function updateParams(effect, params) {
      for (var param in params) {
        service[effect][param] = params[param];
      }
    }
  }
}());
