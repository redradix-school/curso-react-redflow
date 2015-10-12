var mori = require('mori');

var mapa = mori.hashMap("key1", 100, "key2", "una cadena", "key3", true);
var set = mori.set([1,2,3,4,5]);
var vector = mori.vector("foo", "bar", "foobar");

//map, reduce

var sequence = mori.map(function(item){
  return item * 100;
}, set);
console.log('Map sobre set', sequence.toString());

var sumatorio = mori.reduce(function(acc, value){
  return acc + value;
}, 0, sequence);
console.log('Reduce sobre seq', sumatorio);

// indexOf
function getIndexOf(vector, value){
  return mori.reduceKV(function(acc, index, val){
    console.log('Buscando ' + value + ' en ' + index,val);
    if(val === value){
      return index;
    }
    else {
      return acc;
    }
  }, -1, vector);
}
console.log('ReduceKV sobre vector', getIndexOf(vector, 'foobar'));


var vector2 = [1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20];
//filter
var impares = mori.filter(function(n){
  return n % 2 === 1;
}, vector2);
//remove
var imparesMayoresQue10 = mori.remove(function(n){
  return n < 10;
}, impares);

console.log('remove, filter', imparesMayoresQue10.toString());
//sort
var deMenorAMayor = mori.sort(function(a,b){
  return b-a;
}, imparesMayoresQue10);

console.log('Sort', deMenorAMayor.toString());
//take
console.log('Take 2', mori.take(2, deMenorAMayor));
//drop
console.log('Drop 7', mori.drop(7, impares));
