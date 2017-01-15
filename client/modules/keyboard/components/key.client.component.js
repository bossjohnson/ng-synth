(function() {
  angular.module('Keyboard')
    .component('key', {
      templateUrl: 'modules/keyboard/views/key.client.view.html',
      controller: 'KeyController',
      controllerAs: 'vm',
      bindings: {
        color: '@',
        note: '='
      }
    });
}());
