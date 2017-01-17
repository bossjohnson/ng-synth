(function() {
  angular.module('Delay')
    .controller('DelayController', DelayController);

  DelayController.$inject = ['$scope', 'Delay'];

  function DelayController($scope, Delay) {
    var vm = this;

    vm.params = Delay.params;

    vm.updateParams = updateParams;

    // hoisted functions
    function updateParams() {
      Delay.params = vm.params;
    }


  }
}());
