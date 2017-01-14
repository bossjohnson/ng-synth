(function() {
  angular.module('Synth')
    .controller('KeyboardController', KeyboardController);

  KeyboardController.$inject = ['$scope', '$timeout', 'WebAudioAPI', 'Pitch', 'Mouse'];

  function KeyboardController($scope, $timeout, WebAudioAPI, Pitch, Mouse) {
    var vm = this,
      audio = WebAudioAPI,
      context = audio.context;

    vm.play = play;
    vm.playIfMouseDown = playIfMouseDown;

    vm.notes = Pitch.notes.filter(function(note) {
      var c4Index = Pitch.notes.indexOf('c4'),
        c5Index = Pitch.notes.indexOf('c5');
      return (Pitch.notes.indexOf(note) >= c4Index && Pitch.notes.indexOf(note) <= c5Index);
    });

    vm.whiteKeys = vm.notes.filter(function(note) {
      return note.indexOf('#') < 0;
    });

    vm.blackKeys = vm.notes.filter(function(note) {
      return note.indexOf('#') > -1;
    });

    function play(note) {
      var osc = WebAudioAPI.newOscillator(note);
      osc.gainNode.gain.value = 1;

      $scope.$on('stop', function(ev, stopNote) {
        if (note === stopNote) {
          osc.gainNode.gain.value = 0;
        }
      });
    }

    function playIfMouseDown(note) {
      if (Mouse.down) {
        play(note);
      }
    }

  }
}());
