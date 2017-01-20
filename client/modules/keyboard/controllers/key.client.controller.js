(function() {
  angular.module('Keyboard')
    .controller('KeyController', KeyController);

  KeyController.$inject = ['$scope', '$element', '$timeout', 'Mouse', 'AttackDecayService', 'WebAudioAPI'];

  function KeyController($scope, $element, $timeout, Mouse, AttackDecayService, WebAudioAPI) {
    var vm = this,
      context = WebAudioAPI.context;

    vm.$onInit = function() {
      if (vm.note === 'c4') {
        $scope.$emit('scrollToKey', vm.note);
      }

      $timeout(function() {
        if (vm.color === 'white') return;
        var naturalName = $element[0].id.replace('#', ''),
          natural = document.getElementById(naturalName),
          whiteKey = angular.element(natural);

        whiteKey.after($element);
      });
    };

    // *************
    // Click Handlers
    // *************

    $element.on('mousedown', playNote);

    $element.on('mouseenter', function() {
      $element.addClass('hover-key');
    });

    $element.on('mouseleave', function() {
      $element.removeClass('hover-key');
    });

    // **************
    // Touch Handlers
    // **************

    $element.on('touchstart', function(ev) {
      ev.preventDefault();
      playNote();
    });

    // *****************
    // Hoisted functions
    // *****************
    function stopNote(osc) {
      var attack = AttackDecayService.attack,
        decay = AttackDecayService.decay;

      osc.gainNode.gain.cancelScheduledValues(context.currentTime - (attack / 1000));
      osc.gainNode.gain.linearRampToValueAtTime(0, context.currentTime + (decay / 1000));

      $element.css('transition', decay / 1000 + 's');
      $element.css('background-color', vm.color === 'white' ? 'white' : 'black');

      $timeout(function() {
        $element.css('transition', '0s');
        osc.stop();
      }, decay);
    }

    function playNote() {
      var osc = WebAudioAPI.newOscillator(vm.note),
        attack = AttackDecayService.attack,
        decay = AttackDecayService.decay;

      $element.css('transition', attack / 1000 + 's');
      $element.css('background-color', randomColor());

      osc.gainNode.gain.linearRampToValueAtTime(1, context.currentTime + attack / 1000);

      $element.on('mouseup', stop);
      $element.on('mouseleave', stop);
      $element.on('touchend', stop);
      $element.on('touchmove', stop);

      function stop() { // <-- hoisted
        stopNote(osc);
      }
    }

  }
}());
