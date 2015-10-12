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
    return _.getIn(state, p.items);
  },

  getCartTotal: function(state){
    return calculateTotal(_.getIn(state, p.items));
  },

  //Comandos
  addProduct: Dispatcher.listen("CART:ADD", function(product){
    var quantity = 1;
    var existingProduct = findProductInCartById(_.get(product, 'id'), atom.getIn(p.items));
    if(existingProduct){
      CartStore.changeQuantity(product, 1);
    }
    else {
      atom.updateIn(p.items, function(items){
        return _.conj(items, _.assoc(product, 'qty', 1));
      });
    }
  }),

  removeProduct: Dispatcher.listen("CART:REMOVE", function(product){
    var id = _.get(product, 'id');
    atom.updateIn(p.items, function(items){
      return _.remove(_.partial(productById, id), items);
    });
  }),

  changeQuantity: Dispatcher.listen("CART:CHANGE:QTY", function(product, delta){
    var updatedCart = _.map(function(p){
      if(_.get(p, 'id') === _.get(product, 'id')){
        return _.assoc(p, 'qty', _.get(p, 'qty')+delta);
      }
      else {
        return p;
      }
    }, atom.getIn(p.items));

    //filtrar elementos con cantidad 0
    //antes de guardar en el átomo
    atom.updateIn(p.items, function(items){
      return _.filter(function(p){
        return _.get(p, 'qty') > 0;
      }, updatedCart);
    });
  }),

  emptyCart: Dispatcher.listen("ORDER:COMPLETE", function(){
    atom.assocIn(p.items, _.vector());
  })
};

module.exports = CartStore;