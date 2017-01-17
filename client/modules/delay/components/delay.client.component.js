(function() {
  angular.module('Delay')
    .component('delay', {
      templateUrl: 'modules/delay/views/delay.client.view.html',
      controller: 'DelayController',
      controllerAs: 'vm'
    });
}());
