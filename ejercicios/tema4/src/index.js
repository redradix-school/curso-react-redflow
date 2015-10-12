var React = require('react'),
    _ = require('mori'),
    atom = require('./lib/atom_state'),
    Dispatcher = require('./lib/dispatcher'),
    initialState = require('./config/initial_state'),
    routes = require('./routes'),
    shoppingCartService = require('./services/shopping_cart');


var Root = require('./components/root');

window.onload = function(){
  //setup atom initial value
  atom.silentSwap(_.toClj(initialState));
  //mount root component
  React.render(<Root />, document.body);
  //init routes
  //routes.init();

  //load external catalog data
  // este evento se atiende en CatalogStore
  //Dispatcher.emit("CATALOG:LOAD");
}
