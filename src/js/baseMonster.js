
'use strict';





function standStill() {}





function monster(Behavior) {
  return Behavior;
}





function param(Options) {

  var uOptions = Options || {},

      Behavior = {

        name           : Options.name           || 'Monster',
        symbol         : Options.symbol         || 'X',
        className      : Options.className      || 'monster',

        followBehavior : Options.followBehavior || standStill,

        x              : Options.x              || 0,
        y              : Options.y              || 0,
        hp             : 20 // whargarbl

      };

  return monster(Behavior);

}





module.exports = {

  param: param

}