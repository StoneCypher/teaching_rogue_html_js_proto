
'use strict';

var spec = require('dieSpec');





function spec(DS) {

  // if there is no 'd', then it must be a positive integer used whole
  // if there is a 'd', there may be an integer before, and must be after
  // if there is a d, after the after, there is permitted to be either
  //   a plus or minus then another integer, for adjustment
  //
  // 12
  // 3d4
  // d6
  // 2d8+12
  // 3d6-2

  var base = DS.split('d');
  if (base.length === 1) { return parseInt(base[0], 10); }

}





module.exports = {

  spec: spec

};
