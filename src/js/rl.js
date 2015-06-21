
'use strict';





var MapOptions = {
  height: 20,
  width: 40
};

var PlayerOptions = {
  initialLoc : {x: 20, y: 4}
};





var Map      = require('map').init(MapOptions),
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
