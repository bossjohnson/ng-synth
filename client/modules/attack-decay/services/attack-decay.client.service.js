(function() {
  angular.module('AttackDecay')
    .factory('AttackDecayService', AttackDecayService);

  function AttackDecayService() {
    var service = {
      attack: 0,
      decay: 1000
    };
    return service;
  }
}());
