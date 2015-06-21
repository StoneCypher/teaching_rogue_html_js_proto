
var mapFactory = (function() {

  'use strict';



  function requireKeys(Keys, Obj) {
    Keys.map(function(Key) {
      if (Obj[Key] === undefined) { throw 'failed: requre ' + Key; }
    });
    return true;
  }



  return {

    create: function(Options) {
      requireKeys(['height', 'width'], Options);
      return Options;
    }

  };

})();