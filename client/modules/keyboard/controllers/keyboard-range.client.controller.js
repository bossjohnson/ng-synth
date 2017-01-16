(function() {
  angular.module('Keyboard')
    .controller('RangeController', RangeController);

  RangeController.$inject = ['KeyboardRange'];

  function RangeController(KeyboardRange) {
    var vm = this,
      bottom = KeyboardRange.bottom,
      top = KeyboardRange.top;

    vm.range = {
      bottom: bottom,
      top: top
    };

    vm.$onInit = onInit;

    // hoisted functions
    function onInit() {
      vm.update = update;
    }

    function update() {
      vm.keyboard.keys = KeyboardRange.getKeys(vm.range.bottom, vm.range.top);
    }
  }
}());
