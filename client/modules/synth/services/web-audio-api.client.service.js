(function() {
  angular.module('Synth')
    .factory('WebAudioAPI', WebAudioAPI);

  WebAudioAPI.$inject = ['Pitch'];

  function WebAudioAPI(Pitch) {
    var service = {},
      audioContext = window.AudioContext || window.webkitAudioContext,
      context = new audioContext();

    service.context = context;
    service.newOscillator = newOscillator;

    return service;

    // hoisted functions
    function newOscillator(note) {
      var osc = context.createOscillator();
      osc.frequency.value = Pitch.getFreq(note);
      osc.connect(context.destination);
      return osc;
    }
  }
}());
