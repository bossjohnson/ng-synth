(function() {
  angular.module('Keyboard')
    .controller('KeyboardController', KeyboardController);

  KeyboardController.$inject = ['$scope', '$timeout', 'WebAudioAPI', 'AttackDecayService', 'Keyboard', 'Pitch', 'Mouse'];

  function KeyboardController($scope, $timeout, WebAudioAPI, AttackDecayService, Keyboard, Pitch, Mouse) {
    var vm = this,
      context = WebAudioAPI.context;

    vm.keys = Keyboard.keys;
    vm.playIfMouseDown = playIfMouseDown;

    $scope.$on('scrollToKey', function(ev, note) {
      $timeout(function() {
        var target = document.getElementById(note),
          keybaord = document.getElementById('keyboard'),
          offset = target.offsetLeft;
        keyboard.scrollLeft = offset;
      });
    });

  }
}());
