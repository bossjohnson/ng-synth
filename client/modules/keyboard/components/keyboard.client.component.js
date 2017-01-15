(function() {
  angular.module('Keyboard')
    .component('keyboard', {
      templateUrl: 'modules/keyboard/views/keyboard.client.view.html',
      controller: 'KeyboardController',
      controllerAs: 'vm'
    });
}());
