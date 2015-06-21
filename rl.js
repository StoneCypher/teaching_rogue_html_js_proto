
var rl = (function(document) {

  'use strict';

  var MapOptions = {
    height: 20,
    width: 40
  };

  var Map = mapFactory.create(MapOptions);



  function needsRender() {
    renderString(Map.data, Map.width);
  }



  var player = {

    loc        : {x: 20, y: 4},
    doNothing  : function() {},  // whargarbl todo


    tryMoveBy  : function(dX, dY) {

      var newX = player.loc.x + dX,
          newY = player.loc.y + dY;

      if (Map.canPass(newX, newY)) {
        player.loc.x = newX;
        player.loc.y = newY;
        needsRender();
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



  function classFor(cellType) {

    switch (cellType) {

      case '@' : return 'player';
      case '#' : return 'wall';
      case '+' : return 'door';
      case '$' : return 'gold';
      case '.' : return 'floor';

      case '{' : case '|' : case '}' : case '/' :
                 return 'weapon';

      case 'a' : case 'b' : case 'c' : case 'd' : case 'e' : case 'f' : case 'g' : case 'h' : case 'i' : case 'j' : case 'k' : case 'l' : case 'm' : case 'n' : case 'o' : case 'p' : case 'q' :  case 'r' :  case 's' : case 't' : case 'u' : case 'v' : case 'w' : case 'x' : case 'y' :  case 'z' :
      case 'A' : case 'B' : case 'C' : case 'D' : case 'E' : case 'F' : case 'G' : case 'H' : case 'I' : case 'J' : case 'K' : case 'L' : case 'M' : case 'N' : case 'O' : case 'P' : case 'Q' :  case 'R' :  case 'S' : case 'T' : case 'U' : case 'V' : case 'W' : case 'X' : case 'Y' :  case 'Z' :
                 return 'monster';

      default  : return 'misc';

    }

  }



  function stringMapToTable(MapData, Width) {

    var table  = document.createElement('table'),
        height = Map.height,
        idx    = 0;

    for (var j=0; j < height; ++j) {

      var tr = document.createElement('tr');

      for (var i=0; i < Width; ++i) {

        var td       = document.createElement('td'),
            cellType = Map.data[idx++],
            override = false;

        // lol whargarbl todo this is fucking awful what's wrong with you
        if ((i === player.loc.x) && (j === player.loc.y)) { override = '@'; }

        td.innerHTML = override? override : cellType;
        td.className = classFor(override? override : cellType);
        tr.appendChild(td);

      }

      table.appendChild(tr);

    }

    return table;

  }




  function renderString(MapData, Width) {

    var body = document.getElementById('mapdiv'),
        newC = stringMapToTable(MapData, Width);

    body.innerHTML = '';
    body.appendChild(newC);

  }



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

    console.log('bootstrap');
    needsRender();
    document.body.onkeyup = function(ke) { keyHandler(ke); };

  }



  return {

    renderMap: stringMapToTable,
    renderString: renderString,

    keyHandler: keyHandler,
    bootstrap: bootstrap

  };



})(document);
