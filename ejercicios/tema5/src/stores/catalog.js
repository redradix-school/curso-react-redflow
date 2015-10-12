var _ = require('mori'),
    atom = require('../lib/atom_state'),
    Dispatcher = require('../lib/dispatcher'),
    shoppingCartService = require('../services/shopping_cart');

var p = {
  products: ['data', 'catalog']
};

var CatalogStore = {
  getProducts: function(state){
    return _.getIn(state, p.products);
  },

  loadProducts: Dispatcher.listen("CATALOG:LOAD", function(){
    shoppingCartService.loadCatalogDataPromise()
      .then(function(products){
        atom.assocIn(p.products, _.toClj(products));
      })
      .catch(function(err){
        console.error("Error al cargar los productos", err);
      });
  }),

  saveProducts: Dispatcher.listen("CATALOG:LOAD:COMPLETE", function(products){
    atom.assocIn(p.products, _.toClj(products));
  })
};

module.exports = CatalogStore;