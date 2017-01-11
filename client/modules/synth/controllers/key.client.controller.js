(function() {
  angular.module('Synth')
    .controller('KeyController', KeyController);

  KeyController.$inject = ['$element', '$timeout'];

  function KeyController($element, $timeout) {
    var vm = this;

    $timeout(function() {
      if (vm.color === 'white') return;
      var naturalName = $element[0].id.replace('#', ''),
        natural = document.getElementById(naturalName),
        whiteKey = angular.element(natural);

        whiteKey.after($element);
    });
  }
}());
