(function() {
  angular.module('Chorus')
    .factory('Chorus', Chorus);

  function Chorus() {
    var service = {};

    service.params = {
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
    };

    service.updateParams = updateParams;

    return service;

    // hoisted functions
    function updateParams(params) {
      console.log(params);
    }
  }
}());
