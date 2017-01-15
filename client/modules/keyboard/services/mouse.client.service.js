(function () {
  angular.module('Keyboard')
    .factory('Mouse', Mouse);

    function Mouse() {
      return {
        down: false
      };
    }
}());
