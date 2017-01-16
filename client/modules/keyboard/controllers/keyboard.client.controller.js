(function() {
  angular.module('Keyboard')
    .controller('KeyboardController', KeyboardController);

  KeyboardController.$inject = ['$scope', '$timeout', '$element', 'WebAudioAPI', 'AttackDecayService', 'KeyboardRange', 'Pitch', 'Mouse'];

  function KeyboardController($scope, $timeout, $element, WebAudioAPI, AttackDecayService, KeyboardRange, Pitch, Mouse) {
    var vm = this,
      audio = WebAudioAPI,
      context = audio.context,
      bottom = KeyboardRange.bottom,
      top = KeyboardRange.top;

    vm.keys = KeyboardRange.getKeys(bottom, top);
    vm.play = play;
    vm.playIfMouseDown = playIfMouseDown;

    $scope.$on('scrollToKey', function(ev, note) {
      $timeout(function() {
        var target = document.getElementById(note),
          keybaord = document.getElementById('keyboard'),
          offset = target.offsetLeft;
        keyboard.scrollLeft = offset;
      });
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
          $timeout(function() {
            osc.stop();
          }, decay + 100);
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
