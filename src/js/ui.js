
'use strict';

var Player   = require('player'),
    Renderer = require('renderer');





function keyHandler(keyEvent) {

  var keycode = (keyEvent || window.event).keyCode;

  switch (keycode) {

    /* 1..4, 6..9 */
    case 97 : case 98 : case 99 : case 100 : case 102 : case 103 : case 104 : case 105 :
        if (Player.move(keycode)) { Renderer.needsRender(); }
        break;

    case 101 : /* 5 */ Player.doNothing(); break;
    case 190 : /* . */ Player.doNothing(); break;

    default  : /* ignore the keypress */   break;

  }

}





module.exports = {
  keyHandler: keyHandler
};
