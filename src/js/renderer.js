
'use strict';





var Player = require('player'),
    Map    = require('map');





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





function stringMapToTable() {

  var uMap   = Map.getMap();
  var table  = document.createElement('table');
  var height = uMap.height;
  var idx    = 0;

  for (var j=0; j < uMap.height; ++j) {

    var tr = document.createElement('tr');

    for (var i=0; i < uMap.width; ++i) {

      var td       = document.createElement('td'),
          cellType = uMap.data[idx++],
          override = false;

      // lol whargarbl todo this is fucking awful what's wrong with you
      if ((i === Player.loc.x) && (j === Player.loc.y)) { override = '@'; }

      td.innerHTML = override? override : cellType;
      td.className = classFor(override? override : cellType);
      tr.appendChild(td);

    }

    table.appendChild(tr);

  }

  return table;

}





function render() {

  var body = document.getElementById('mapdiv'),
      newC = stringMapToTable();

  body.innerHTML = '';
  body.appendChild(newC);

}





function needsRender() {
  console.log('attempting render');
  render(Map, Player);
}





module.exports = {

  create: function() {
    return {
      needsRender: needsRender,
    };
  }

};
