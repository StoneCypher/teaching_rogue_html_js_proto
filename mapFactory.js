
var mapFactory = (function() {

  'use strict';

  var thisMap =
    '########.############.##################' +
    '########.############+##################' +
    '########.##########....{.###############' +
    '########.##########.....$###############' +
    '########..........+..K...###############' +
    '###########.#######......+......########' +
    '###########.#######......######.########' +
    '###########.###################.........' +
    '#......####.############################' +
    '#.....a+....############################' +
    '#.}....#################################' +
    '#......#################################' +
    '###+##################....##############' +
    '###.##################.T..##############' +
    '###.############.....+....+....#########' +
    '###.############.#####./..####.#########' +
    '###..............#####....####......####' +
    '#######.################+##########.####' +
    '#######.################.##########.####' +
    '#######.################.##########.####';



  function requireKeys(Keys, Obj) {
    Keys.map(function(Key) {
      if (Obj[Key] === undefined) { throw 'failed: requre ' + Key; }
    });
    return true;
  }



  return {

    create: function(Options) {

      requireKeys(['height', 'width'], Options);



      var height = Options.height,
          width  = Options.width;



      function canPass(X, Y) {
        if ((X < 0) || (Y < 0) || (X >= width) || (Y >= height)) { return false; } // whargarbl todo magic constants
        switch (thisMap[(Y * width) + X]) { // whargarbl todo remove magic constant, need api for getting map cell
          case '.' : return true;
          case '+' : return true; // whargarbl todo wrong
          default  : return false;
        }
      }



      return {
        height  : height,
        width   : width,
        data    : thisMap,
        canPass : canPass
      };

    }

  };

})();
