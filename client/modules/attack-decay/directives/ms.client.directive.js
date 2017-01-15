(function() {
  angular.module('AttackDecay')
    .directive('ms', ms);

  function ms() {
    var directive = {
      restrict:'A',
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, elem, attrs, ctrl) {
      
    }
  }
}());
