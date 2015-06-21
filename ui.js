
var UiFactory = (function() {

  'use strict';



  return {

    create: function(Player) {



      function keyHandler(keyEvent) {

        var keycode = (keyEvent || window.event).keyCode;

        switch (keycode) {

          /* 1..4, 6..9 */
          case 97 : case 98 : case 99 : case 100 : case 102 : case 103 : case 104 : case 105 : Player.move(keycode); break;

          case 101 : /* 5 */ Player.doNothing(); break;
          case 190 : /* . */ Player.doNothing(); break;

          default  : /* ignore the keypress */   break;

        }

      }



      return {

        keyHandler: keyHandler

      };
    }

  };

})();
