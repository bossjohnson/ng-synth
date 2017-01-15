(function() {
  angular.module('Keyboard')
    .controller('KeyboardController', KeyboardController);

  KeyboardController.$inject = ['$scope', '$timeout', 'WebAudioAPI', 'AttackDecayService', 'Pitch', 'Mouse'];

  function KeyboardController($scope, $timeout, WebAudioAPI, AttackDecayService, Pitch, Mouse) {
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

    // hoisted functions
    function play(note) {
      var osc = WebAudioAPI.newOscillator(note),
        attack = AttackDecayService.attack,
        decay = AttackDecayService.decay;

      osc.gainNode.gain.linearRampToValueAtTime(1, context.currentTime + attack / 1000);
      var removeStopHandler = $scope.$on('stop', function(ev, stopNote) {
        if (note === stopNote) {
          osc.gainNode.gain.cancelScheduledValues(context.currentTime - (attack / 1000));
          osc.gainNode.gain.linearRampToValueAtTime(0, context.currentTime + (decay / 1000));
        }
        removeStopHandler();
      });
    }

    function playIfMouseDown(note) {
      if (Mouse.down) {
        play(note);
      }
    }

  }
}());
