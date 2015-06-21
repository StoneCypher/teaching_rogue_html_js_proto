
'use strict';

var MapOptions = {
  height: 20,
  width: 40
};

var PlayerOptions = {
  loc : {x: 20, y: 4}
};

var Map      = mapFactory.create(MapOptions),
    Player   = PlayerFactory.create(PlayerOptions, Map), // whargarbl uh oh
    Renderer = RendererFactory.create(Map, Player),
    UI       = UiFactory.create(Player, Renderer);



function bootstrap() {

  Renderer.needsRender();
  document.body.onkeyup = function(ke) { UI.keyHandler(ke); };

}



module.exports = {
  bootstrap: bootstrap
};