(function() {
  angular.module('Delay')
    .factory('Delay', Delay);

  function Delay() {
    var service = {};

    service.params = {
      feedback: 0.45,
      delayTime: 150,
      wetLevel: 0.25,
      dryLevel: 1,
      cutoff: 2000,
      bypass: 0
    };

    return service;
  }
}());
