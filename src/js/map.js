
'use strict';





var currMap = null,

    height  = null,
    width   = null,

    thisMap =
      '########.############.##################' +
      '########.############+##################' +
      '########.##########....{.###############' +
      '########.##########.....$###############' +
      '########..........+......###############' +
      '###########.#######......+......########' +
      '###########.#######......######.########' +
      '###########.###################.........' +
      '#......####.############################' +
      '#......+....############################' +
      '#.}....#################################' +
      '#......#################################' +
      '###+##################....##############' +
      '###.##################....##############' +
      '###.############.....+....+....#########' +
      '###.############.#####./..####.#########' +
      '###..............#####....####......####' +
      '#######.################+##########.####' +
      '#######.################.##########.####' +
      '#######.################.##########.####';





function requireKeys(Keys, Obj) {

  Keys.map(function(Key) {
    if (Obj[Key] === undefined) { throw 'failed: requre ' + Key; }
  });

  return true;

}





function canPass(X, Y) {
  if ((X < 0) || (Y < 0) || (X >= width) || (Y >= height)) { return false; } // whargarbl todo magic constants
  switch (thisMap[(Y * width) + X]) { // whargarbl todo remove magic constant, need api for getting map cell
    case '.' : return true;
    case '+' : return true; // whargarbl todo wrong
    default  : return false;
  }
}





function create(Options) {

  requireKeys(['height', 'width'], Options);

  height = Options.height;
  width  = Options.width;

  return Options;

}





function getMap() {
  return currMap;
}





function init(Options) {
  currMap = create(Options);
  return module.exports;
}





module.exports = {

  height  : function() { return height; },
  width   : function() { return width; },
  data    : function() { return thisMap; },

  create  : create,
  getMap  : getMap,
  init    : init,
  canPass : canPass

};
