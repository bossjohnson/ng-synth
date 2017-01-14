(function () {
  angular.module('Synth')
    .factory('Mouse', Mouse);

    function Mouse() {
      return {
        down: false
      };
    }
}());
