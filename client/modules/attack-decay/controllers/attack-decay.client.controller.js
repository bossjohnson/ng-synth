(function() {
  angular.module('AttackDecay')
    .controller('AttackDecayController', AttackDecayController);

  AttackDecayController.$inject = ['$scope', 'WebAudioAPI', 'AttackDecayService'];

  function AttackDecayController($scope, WebAudioAPI, AttackDecayService) {
    var vm = this;

    vm.params = {};
    vm.updateParams = updateParams;

    vm.params.attack = AttackDecayService.attack;
    vm.params.decay = AttackDecayService.decay;

    // hoisted functions
    function updateParams() {
      AttackDecayService.attack = vm.params.attack;
      AttackDecayService.decay = vm.params.decay;
    }
  }
}());
