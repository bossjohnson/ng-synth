(function() {
  angular.module('Keyboard')
    .component('keyboardRange', {
      templateUrl: 'modules/keyboard/views/keyboard-range.client.view.html',
      controller: 'RangeController',
      controllerAs: 'vm',
      require: {
        keyboard: '^keyboard'
      }
    });
}());
