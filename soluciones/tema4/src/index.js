var React = require('react'),
    _ = require('mori'),
    atom = require('./lib/atom_state'),
    Dispatcher = require('./lib/dispatcher'),
    initialState = require('./config/initial_state'),
    routes = require('./routes'),
    shoppingCartService = require('./services/shopping_cart');


var Root = require('./components/root');

window.onload = function(){
  //cargamos el átomo con un valor inicial
  atom.silentSwap(_.toClj(initialState));
  //montamos el componente en el DOM
  React.render(<Root />, document.body);

  routes.init();
  //cargamos los datos externos del catálogo

  // Opcion 1 - el servicio emitirá por Dispatcher
  // este evento se atiende en el propio servicio
  //Dispatcher.emit("CATALOG:SERVICE:LOAD");

  // Opcion 2 - el propio store usará el servicio
  // este evento se atiende en CatalogStore
  Dispatcher.emit("CATALOG:LOAD");
}
