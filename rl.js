
var rl = (function(document) {

  'use strict';

  var MapOptions = {
    height: 20,
    width: 40
  };

  var Map = mapFactory.create(MapOptions);



  var player = {

    loc        : {x: 20, y: 4},
    doNothing  : function() {},  // whargarbl todo


    tryMoveBy  : function(dX, dY) {

      var newX = player.loc.x + dX,
          newY = player.loc.y + dY;

      if (Map.canPass(newX, newY)) {
        player.loc.x = newX;
        player.loc.y = newY;
        Renderer.needsRender();
      }

    },


    move : function(npad) {

      switch (npad) {

        case 97  : /* 1 */ player.tryMoveBy(-1,  1); break;
        case 98  : /* 2 */ player.tryMoveBy( 0,  1); break;
        case 99  : /* 3 */ player.tryMoveBy( 1,  1); break;

        case 100 : /* 4 */ player.tryMoveBy(-1,  0); break;
        case 102 : /* 6 */ player.tryMoveBy( 1,  0); break;

        case 103 : /* 7 */ player.tryMoveBy(-1, -1); break;
        case 104 : /* 8 */ player.tryMoveBy( 0, -1); break;
        case 105 : /* 9 */ player.tryMoveBy( 1, -1); break;

        default  : throw 'nonsense keypress to player.move';

      }

    }

  };



  var Renderer = RendererFactory.create(Map, player);



  function keyHandler(keyEvent) {

    var keycode = (keyEvent || window.event).keyCode;

    switch (keycode) {

      /* 1..4, 6..9 */
      case 97 : case 98 : case 99 : case 100 : case 102 : case 103 : case 104 : case 105 : player.move(keycode); break;

      case 101 : /* 5 */ player.doNothing(); break;
      case 190 : /* . */ player.doNothing(); break;

      default  : /* ignore the keypress */   break;

    }

  }



  function bootstrap() {

    Renderer.needsRender();
    document.body.onkeyup = function(ke) { keyHandler(ke); };

  }



  return {

    keyHandler: keyHandler,
    bootstrap: bootstrap

  };



})(document);
