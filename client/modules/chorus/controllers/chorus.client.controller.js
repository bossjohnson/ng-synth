(function() {
  angular.module('Chorus')
    .controller('ChorusController', ChorusController);

  ChorusController.$inject = ['$scope', 'Chorus', 'WebAudioAPI'];

  function ChorusController($scope, Chorus, WebAudioAPI) {
    var vm = this;

    vm.params = Chorus.params;

    vm.updateParams = function () {
      WebAudioAPI.updateParams('chorus', vm.params);
    };

    // hoisted functions
    // function updateParams() {
    //   Chorus.params = vm.params;
    // }
  }
}());
