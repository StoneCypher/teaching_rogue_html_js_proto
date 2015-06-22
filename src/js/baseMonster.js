
'use strict';

var dieSpec = require('dieSpec');





function standStill() {}





function monster(Behavior) {
  return Behavior;
}





function param(Options) {

  var uOptions = Options || {},

      Behavior = {

        name           : Options.name               || 'Monster',
        symbol         : Options.symbol             || 'X',
        className      : ((Options.className + ' ') || '') + 'creature',

        followBehavior : Options.followBehavior     || standStill,

        x              : Options.x                  || 0,
        y              : Options.y                  || 0,

        hp             : dieSpec.parse(Options.hp   || '20')

      };

  return monster(Behavior);

}





module.exports = {

  param: param

}