
// http://pegjs.org/online

start
  = any

any
  = countmod
  / nocountmod
  / count
  / nocount
  / constant

count
  = ct:integer 'd' sz:integer { return {count: parseInt(ct, 10), size: parseInt(sz, 10), adjustment: 0 }; }

nocount
  = 'd' sz:integer { return {count: 1, size: parseInt(sz, 10), adjustment: 0 }; }

countmod
  = ct:integer 'd' sz:integer '+' adj:integer { return {count: parseInt(ct, 10), size: parseInt(sz, 10), adjustment: parseInt(adj, 10)      }; }
  / ct:integer 'd' sz:integer '-' adj:integer { return {count: parseInt(ct, 10), size: parseInt(sz, 10), adjustment: parseInt(adj, 10) * -1 }; }

nocountmod
  = 'd' sz:integer '+' adj:integer { return {count: 1, size: parseInt(sz, 10), adjustment: parseInt(adj, 10)      }; }
  / 'd' sz:integer '-' adj:integer { return {count: 1, size: parseInt(sz, 10), adjustment: parseInt(adj, 10) * -1 }; }

constant
  = integer

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
