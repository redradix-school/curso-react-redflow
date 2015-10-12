var debounce = require('./utils').debounce,
    mori = require('mori');

// atom state

var state;
var listeners = [];
var atom;

// some utils

var slice = [].slice;

function wrap(op, args) {
  return mori[op].apply(mori, [getState()].concat(args));
}

// simple publisher

var notifySwap = debounce(function(state) {
  for (var i=listeners.length; i--;) listeners[i](state);
}, 10);

// public methods

function getState() {
  return state;
}

function swap(newState) {
  this.silentSwap(newState);
  notifySwap(state);
  return newState;
}

function silentSwap(newState) {
  state = newState;
  return newState;
}

function addChangeListener(fn) {
  listeners.push(fn);
}

function getIn() {
  return wrap('getIn', slice.call(arguments));
}

function assocIn() {
  return atom.swap(wrap('assocIn', slice.call(arguments)));
}

function updateIn() {
  return atom.swap(wrap('updateIn', slice.call(arguments)));
}

function silentUpdateIn() {
  return atom.silentSwap(wrap('updateIn', slice.call(arguments)));
}

function silentAssocIn() {
  return atom.silentSwap(wrap('assocIn', slice.call(arguments)));
}

// Batched assocIn, [cursor, data], [cursor, data], ...
function batchAssocIn() {
  var writes = slice.call(arguments);
  for (var i=writes.length; i--;) silentAssocIn(writes[i][0], writes[i][1]);
  notifySwap(state);
}

// the atom per se

atom = {
  getState: getState,
  get: getState,
  swap: swap,
  silentSwap: silentSwap,
  addChangeListener: addChangeListener,
  // extend it with some mori ops
  getIn: getIn,
  assocIn: assocIn,
  updateIn: updateIn,
  silentAssocIn: silentAssocIn,
  silentUpdateIn: silentUpdateIn,
  batchAssocIn: batchAssocIn
};

module.exports = atom;
