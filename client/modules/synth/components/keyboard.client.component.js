(function() {
  angular.module('Synth')
    .component('keyboard', {
      templateUrl: 'modules/synth/views/keyboard.client.view.html',
      controller: 'KeyboardController',
      controllerAs: 'vm'
    });
}());
