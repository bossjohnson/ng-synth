(function() {
  angular.module('WaveShape')
    .controller('WaveShapeController', WaveShapeController);

  WaveShapeController.$inject = ['WaveShapes'];

  function WaveShapeController(WaveShapes) {
    var vm = this;

    vm.shapes = WaveShapes.shapes;
    vm.selectedShape = 'sine';
    vm.changeWaveShape = changeWaveShape;

    // hoisted functions
    function changeWaveShape() {
      WaveShapes.selected = vm.selectedShape;
    }
  }
}());
