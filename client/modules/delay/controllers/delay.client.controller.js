(function() {
  angular.module('Delay')
    .controller('DelayController', DelayController);

  DelayController.$inject = ['$scope', 'Delay', 'WebAudioAPI'];

  function DelayController($scope, Delay, WebAudioAPI) {
    var vm = this;

    vm.params = Delay.params;

    vm.updateParams = function () {
      WebAudioAPI.updateParams('delay', vm.params);
    };


    // hoisted functions
    // function updateParams() {
    //   Delay.params = vm.params;
    // }
  }
}());
