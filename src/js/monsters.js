
'use strict';

var baseMonster = require('baseMonster');





var monsterList = [
  baseMonster.param({ x: 20, y: 3, name: 'Kobold', symbol: 'k', className: 'kobold' }),
  baseMonster.param({ x: 21, y: 5, name: 'Dragon', symbol: 'D', className: 'dragon' })
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
