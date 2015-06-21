
'use strict';





var monsterList = [
  { x: 20, y: 3, name: 'Kobold', symbol: 'k', color: 'green' },
  { x: 20, y: 5, name: 'Dragon', symbol: 'D', color: 'blue'  }
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
