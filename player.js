
var PlayerFactory = (function() {

  'use strict';

  return {

    create: function(Options, Renderer) {

      var x = Options.x,
          y = Options.y;



      function tryMoveBy(dX, dY) {

        var newX = x + dX,
            newY = y + dY;

        if (Map.canPass(newX, newY)) {
          x = newX;
          y = newY;
          Renderer.needsRender();
        }

      }



      function move(npad) {

        switch (npad) {

          case 97  : /* 1 */ tryMoveBy(-1,  1); break;
          case 98  : /* 2 */ tryMoveBy( 0,  1); break;
          case 99  : /* 3 */ tryMoveBy( 1,  1); break;

          case 100 : /* 4 */ tryMoveBy(-1,  0); break;
          case 102 : /* 6 */ tryMoveBy( 1,  0); break;

          case 103 : /* 7 */ tryMoveBy(-1, -1); break;
          case 104 : /* 8 */ tryMoveBy( 0, -1); break;
          case 105 : /* 9 */ tryMoveBy( 1, -1); break;

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
