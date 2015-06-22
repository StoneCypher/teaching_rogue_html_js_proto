
'use strict';





var Player   = require('player'),
    Map      = require('map'),
    Monsters = require('monsters');





function classFor(cellType) {

  switch (cellType) {

    case '@' : return 'player';
    case '#' : return 'wall';
    case '+' : return 'door';
    case '$' : return 'gold';
    case '.' : return 'floor';
    case ';' : return 'grass';
    case '%' : return 'forest';

    case '>' : case '<' :
               return 'stairs';

    case '{' : case '|' : case '}' : case '/' :
               return 'weapon';

    default  : return '';

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

      var td            = document.createElement('td'),
          cellType      = Map.data()[idx++],
          override      = false,
          overrideClass = false,
          mHere         = Monsters.at(i,j);

      // lol whargarbl todo this is fucking awful what's wrong with you
      if      ((i === Player.x()) && (j === Player.y())) { override = '@';             overrideClass = 'player creature'; }
      else if (mHere.length)                             { override = mHere[0].symbol; overrideClass = mHere[0].className; }

      td.innerHTML = override? override : cellType;
      td.className = (overrideClass? (overrideClass + ' ') : '') + classFor(cellType);
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
  render(Map, Player);
}





module.exports = {
  needsRender: needsRender
};
