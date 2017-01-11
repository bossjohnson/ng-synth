(function() {
  angular.module('Synth')
    .controller('KeyController', KeyController);

  KeyController.$inject = ['$scope', '$element', '$timeout'];

  function KeyController($scope, $element, $timeout) {
    var vm = this;

    $element.on('mouseup', stopNote);
    $element.on('mouseleave', stopNote);
    $element.on('drag', stopNote);

    $timeout(function() {
      if (vm.color === 'white') return;
      var naturalName = $element[0].id.replace('#', ''),
        natural = document.getElementById(naturalName),
        whiteKey = angular.element(natural);

      whiteKey.after($element);
    });

    function stopNote() {
      $scope.$emit('stop', vm.note);
    }
  }
}());
