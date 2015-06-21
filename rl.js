
var rl = (function(document) {



    function classFor(cellType) {

      switch (cellType) {

        case '@' : return 'player';
        case '#' : return 'wall';
        case '+' : return 'door';
        case '$' : return 'gold';
        case 'a' : case 'b' : case 'c' : case 'd' : case 'e' : case 'f' : case 'g' : case 'h' : case 'i' : case 'j' : case 'k' : case 'l' : case 'm' : case 'n' : case 'o' : case 'p' : case 'q' :  case 'r' :  case 's' : case 't' : case 'u' : case 'v' : case 'w' : case 'x' : case 'y' :  case 'z' :
        case 'A' : case 'B' : case 'C' : case 'D' : case 'E' : case 'F' : case 'G' : case 'H' : case 'I' : case 'J' : case 'K' : case 'L' : case 'M' : case 'N' : case 'O' : case 'P' : case 'Q' :  case 'R' :  case 'S' : case 'T' : case 'U' : case 'V' : case 'W' : case 'X' : case 'Y' :  case 'Z' :
                   return 'monster';

        default  : return '';

      }

    }



    function stringMapToTable(MapData, Width) {

      var table  = document.createElement('table'),
          height = 20,  // todo whargarbl
          idx    = 0;

      for (var j=0; j < height; ++j) {

        var tr = document.createElement('tr');

        for (var i=0; i < Width; ++i) {

          var td       = document.createElement('td'),
              cellType = MapData[idx++];

          td.innerHTML = cellType;
          td.className = classFor(cellType);
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




    return {

      renderMap: stringMapToTable,
      renderString: renderString

    };



})(document);

rl.renderString(thisMap, 40);
