var _ = require('mori');
var atom = require('./atom_state');

var valorInicial = {
  page: 'events',
  data: {
    filters: [
      { id: 1, filterString: 'domain:foo' },
      { id: 2, filterString: 'domain:bar' }
    ],
    events: [
      { id: 1, severity: 'warn', active: true },
      { id: 2, severity: 'error', active: true },
      { id: 3, severity: 'error', active: false },
      { id: 4, severity: 'warn', active: false },
      { id: 5, severity: 'info', active: false },
    ]
  },
  ui: {
    menuOpen: false,
    settingsOpen: false,
    settingsTab: 'autoack'
  }
};

var callCount = 0;
function onAtomChange(newState){
  //console.log('Atom changed', newState.toString());
  callCount++;
}

//cambiar referencia completa
atom.swap(_.toClj(valorInicial));

atom.addListener(onAtomChange);

//obtener datos
console.log('atom.getIn OK', atom.getIn(['page']) === 'events');
console.log('atom.getIn vector OK', atom.getIn(['data', 'filters', 0, 'filterString']) === 'domain:foo');

//modificar datos con assoc
atom.assocIn(['ui', 'menuOpen'], true);
atom.assocIn(['data', 'events', 4, 'active'], true);

console.log('atom.assocIn OK', atom.getIn(['ui', 'menuOpen']) === true);
console.log('atom.assocIn vector OK', atom.getIn(['data', 'events', 4, 'active']) === true);

//modificar datos con updateIn
atom.updateIn(['data', 'events'], function(vector){
  return _.map(function(event){
    return _.assoc(event, 'active', !_.get(event, 'active'));
  }, vector);
});

console.log('atom updateIn OK', _.count(_.filter(function(event){
  return _.get(event, 'active') === true;
}, atom.getIn(['data', 'events']))) === 2);

console.log(callCount === 3 ? 'Todo OK!' : 'Algo falla con la notificación de cambios');
