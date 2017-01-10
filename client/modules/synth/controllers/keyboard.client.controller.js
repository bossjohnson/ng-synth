(function() {
  angular.module('Synth')
    .controller('KeyboardController', KeyboardController);

  KeyboardController.$inject = ['$scope', '$timeout', 'WebAudioAPI', 'Pitch'];

  function KeyboardController($scope, $timeout, WebAudioAPI, Pitch) {
    var vm = this,
      audio = WebAudioAPI,
      context = audio.context;

    vm.notes = Pitch.notes.filter(function (note) {
      var c4Index = Pitch.notes.indexOf('c4'),
        c5Index = Pitch.notes.indexOf('c5');

      return (Pitch.notes.indexOf(note) >= c4Index && Pitch.notes.indexOf(note) <= c5Index);
    });
    vm.play = play;

    function play(note) {
      var osc = WebAudioAPI.newOscillator(note);
      osc.start();
    }

  }
}());
