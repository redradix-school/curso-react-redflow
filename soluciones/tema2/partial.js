var mori = require('mori');

function multiplicarPor(x, n){
  return n*x;
}

var por5 = mori.partial(multiplicarPor, 5);
var por6 = mori.partial(multiplicarPor, 6);

console.log(por5(10)); //50
console.log(por6(10)); //60