(function() {
  angular.module('Synth')
    .component('key', {
      templateUrl: 'modules/synth/views/key.client.view.html',
      controller: 'KeyController',
      controllerAs: 'vm',
      bindings: {
        color: '@',
        note: '='
      }
    });
}());
