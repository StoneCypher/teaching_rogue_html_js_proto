
'use strict';





var Map = require('map');

var x   = null,
    y   = null;





function tryMoveBy(dX, dY) {

  var newX = x + dX,
      newY = y + dY;

  if (Map.canPass(newX, newY)) {
    x = newX;
    y = newY;
    return true;
  }

  return false;

}





function move(npad) {

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





function create(Options) {
  x = Options.initialLoc.x;
  y = Options.initialLoc.y;
  return module.exports;
}





module.exports = {

  create     : create,

  doNothing  : function() {},  // whargarbl todo
  tryMoveBy  : tryMoveBy,
  move       : move,
  x          : function() { return x; },
  y          : function() { return y; },

};
