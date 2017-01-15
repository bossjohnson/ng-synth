(function() {
  angular.module('WaveShape')
    .factory('WaveShapes', WaveShapes);

  function WaveShapes() {

    var service = {},
      shapes = ['square', 'sine', 'sawtooth', 'triangle'];

    service.shapes = shapes;
    service.selected = 'sine';

    return service;
  }
}());
