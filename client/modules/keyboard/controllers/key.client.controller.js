(function() {
  angular.module('Keyboard')
    .controller('KeyController', KeyController);

  KeyController.$inject = ['$scope', '$element', '$timeout', 'Mouse', 'AttackDecayService'];

  function KeyController($scope, $element, $timeout, Mouse, AttackDecayService) {
    var vm = this;

    // *************
    // Click Handlers
    // *************
    $element.on('mousedown', function() {
      Mouse.down = true;
      document.addEventListener('mouseup', function mouseUp() {
        stopNote();
        Mouse.down = false;
        document.removeEventListener('mouseup', mouseUp);
      });
    });

    $element.on('mouseleave', stopNote);
    $element.on('drag', stopNote);
    $element.on('mouseup', stopNote);

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
      $element.css('transition', AttackDecayService.attack / 1000 + 's');
      $element.addClass('play-key');
      vm.keyboard.play(vm.note);
    });

    $element.on('touchmove', function(ev) {
      ev.preventDefault();
    });

    $element.on('touchend', function(ev) {
      ev.preventDefault();
      $element.css('transition', AttackDecayService.decay / 1000 + 's');

      $timeout(function() {
        $element.css('transition', '0s');
      }, AttackDecayService.decay);
      $element.removeClass('play-key');
      stopNote();
    });

    $timeout(function() {
      if (vm.color === 'white') return;
      var naturalName = $element[0].id.replace('#', ''),
        natural = document.getElementById(naturalName),
        whiteKey = angular.element(natural);

      whiteKey.after($element);
    });

    vm.$onInit = function() {
      if (vm.note === 'c4') {
        $scope.$emit('scrollToKey', vm.note);
      }
    };

    // hoisted functions
    function stopNote() {
      $scope.$emit('stop', vm.note);
    }
  }
}());
