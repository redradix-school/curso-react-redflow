var _ = require('mori'),
    atom = require('../lib/atom_state'),
    Dispatcher = require('../lib/dispatcher');


//rutas en el átomo (mori)
var p = {
  items: ['data', 'cart']
};

//funciones auxiliares
function productById(id, item){
  return _.get(item, 'id') === id;
}

function findProductInCartById(id, products){
  return _.first(_.filter(_.partial(productById, id), products));
}

function calculateTotal(items){
  return _.reduce(function(acc, item){
    return acc + _.get(item, 'price')*_.get(item, 'qty');
  }, 0, items);
}

var CartStore = {
  //Consultas
  getCartProducts: function(state){
    /* TODO */
  },

  getCartTotal: function(state){
    /* TODO */
  },

  //Comandos
  addProduct: Dispatcher.listen("CART:ADD", function(product){
    /* TODO */
  }),

  removeProduct: Dispatcher.listen("CART:REMOVE", function(product){
    /* TODO */
  }),

  changeQuantity: Dispatcher.listen("CART:CHANGE:QTY", function(product, delta){
    /* TODO */
  }),

  emptyCart: Dispatcher.listen("ORDER:COMPLETE", function(){
    /* TODO */
  })
};

module.exports = CartStore;