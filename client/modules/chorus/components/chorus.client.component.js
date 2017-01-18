(function() {
  angular.module('Chorus')
    .component('chorus', {
      templateUrl: 'modules/chorus/views/chorus.client.view.html',
      controller: 'ChorusController',
      controllerAs: 'vm'
    });
}());
