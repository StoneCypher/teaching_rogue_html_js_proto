
'use strict';





var MapOptions = {
  height : 36,
  width  : 60
};

var PlayerOptions = {
  initialLoc : {x: 80, y: 28}
};





var MapMaker = require('mapMaker'),
    Map      = require('map').init(MapMaker.gen(MapOptions)),
    Player   = require('player').create(PlayerOptions), // whargarbl uh oh
    Renderer = require('renderer'),
    UI       = require('ui');





function bootstrap() {
  document.body.onkeyup = function(ke) { UI.keyHandler(ke); };
  Renderer.needsRender();
}





module.exports = {
  bootstrap: bootstrap
};
