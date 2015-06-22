
'use strict';

var baseMonster = require('baseMonster');





var monsterList = [
  baseMonster.param({ x: 80, y: 27, name: 'Kobold', symbol: 'k', className: 'kobold' }),
  baseMonster.param({ x: 81, y: 28, name: 'Dragon', symbol: 'D', className: 'dragon' })
];





function init(Options) {
  return module.exports;
}





function get() {
  return monsterList;
}





function at(X,Y) {

  return monsterList.filter(function(M) {
    return (M.x === X) && (M.y === Y);
  });

}





module.exports = {

  get: get,
  at: at,
  init: init

};
