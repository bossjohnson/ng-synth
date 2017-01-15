(function() {
  angular.module('WaveShape')
    .component('waveShapeSelect', {
      templateUrl: 'modules/wave-shape/views/wave-shape.client.view.html',
      controller: 'WaveShapeController',
      controllerAs: 'vm'
    });
}());
