var _ = require('mori'),
    atom = require('../lib/atom_state'),
    Dispatcher = require('../lib/dispatcher'),
    shoppingCartService = require('../services/shopping_cart');

var catalogData = require('../data/shopping_cart');

var p = {
  products: ['data', 'catalog']
};

var CatalogStore = {
  getProducts: function(state){
    /* TODO */
  },

  loadProducts: Dispatcher.listen("CATALOG:LOAD", function(){
    /* TODO - only when Dispatcher is discussed */
  }),
};

module.exports = CatalogStore;