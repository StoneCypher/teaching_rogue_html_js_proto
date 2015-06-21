
var rl = (function(document) {



    function stringMapToTable(MapData, Width) {

      var table  = document.createElement('table'),
          height = 20,  // todo whargarbl
          idx    = 0;

      for (var j=0; j < height; ++j) {
        var tr = document.createElement('tr');
        for (var i=0; i < Width; ++i) {
          var td = document.createElement('td');
          td.innerHTML = MapData[idx++];
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
