
var PlayerFactory = (function() {

  'use strict';

  return {

    create: function(Options, Map) {

      var x = Options.loc.x,
          y = Options.loc.y;



      function tryMoveBy(dX, dY) {

        var newX = x + dX,
            newY = y + dY;

        console.log('ulp.');

        if (Map.canPass(newX, newY)) {
          console.log('ooh!');
          x = newX;
          y = newY;
          return true;
        }

        return false;

      }



      function move(npad) {

        console.log('uh?');

        switch (npad) {

          case 97  : /* 1 */ return tryMoveBy(-1,  1); break;
          case 98  : /* 2 */ return tryMoveBy( 0,  1); break;
          case 99  : /* 3 */ return tryMoveBy( 1,  1); break;

          case 100 : /* 4 */ return tryMoveBy(-1,  0); break;
          case 102 : /* 6 */ return tryMoveBy( 1,  0); break;

          case 103 : /* 7 */ return tryMoveBy(-1, -1); break;
          case 104 : /* 8 */ return tryMoveBy( 0, -1); break;
          case 105 : /* 9 */ return tryMoveBy( 1, -1); break;

          default  : throw 'nonsense keypress to player.move';

        }

      }



      return {

        doNothing  : function() {},  // whargarbl todo
        tryMoveBy  : tryMoveBy,
        move       : move,
        loc        : { x: x, y: y },

      };

    }

  };

})();
