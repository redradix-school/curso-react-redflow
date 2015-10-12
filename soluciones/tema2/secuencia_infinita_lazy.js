var mori = require('mori');

//una secuencia infinita de números aleatorios
var aleatorios = mori.repeatedly(Math.random);

//nºs aleatorios entre 0 y 25
var enteros = mori.map(function(n){
  console.log('Redondeando: ' + n);
  return Math.floor(n*25);
}, aleatorios);

// tomamos 10 enteros aleatorios
var muestra = mori.take(10, enteros);

// y ahora forzamos la evaluación de todo
// para imprimirlo por consola
var sinRepetidos = mori.into(mori.set(), muestra);

console.log('Conjunto de enteros aleatorios', sinRepetidos);

