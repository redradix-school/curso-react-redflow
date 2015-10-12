var React = require('react'),
    _ = require('mori'),
    data = require('../../data/shopping_cart'),
    Catalog = require('./catalog'),
    Cart = require('./cart'),
    Checkout = require('./checkout'),
    ThankYou = require('./thank_you');


function productById(id, item){
  return _.get(item, 'id') === id;
}

function findProductInCartById(id, cart){
  return _.first(_.filter(_.partial(productById, id), cart));
}
function removeProductInCartById(id, cart){
  return _.remove(_.partial(productById, id), cart);
}

function addProductToCart(product, cart){
  //find the product in the cart
  var quantity = 1;
  var p = findProductInCartById(_.get(product, 'id'), cart);
  if(p){
    //product was already there, update its quantity
    return updateProductQtyInCart(product, 1, cart);
  }
  //add it with quantity
  return _.conj(cart, _.assoc(product, 'qty', quantity));
}

function updateProductQtyInCart(product, delta, cart){
  var updatedCart = _.map(function(p){
    if(_.get(p, 'id') === _.get(product, 'id')){
      return _.assoc(p, 'qty', _.get(p, 'qty')+delta);
    }
    else {
      return p;
    }
  }, cart);

  //filter items with 0 qty
  return _.filter(function(p){
    return _.get(p, 'qty') > 0;
  }, updatedCart);
}




var ShoppingCart = React.createClass({
  getInitialState: function() {
    return {
      page: 'catalog',
      catalog: _.toClj(data.products),
      cart: _.vector(),
      customerdetails: _.hashMap()
    };
  },

  setPage: function(newPage){
    this.setState({ page: newPage });
  },

  addProductToCart: function(e){
    var p = e.product,
        cartItems = this.state.cart;
    var updatedCart = addProductToCart(p, cartItems);

    this.setState({
      cart: updatedCart,
      page: 'cart'
    });
  },

  changeCartItemQuantity: function(e){
    var updatedCart = updateProductQtyInCart(e.product, e.quantity, this.state.cart);
    this.setState({
      cart: updatedCart
    });
  },

  removeCartItem: function(e){
    var updatedCart = removeProductInCartById(_.get(e.product, 'id'), this.state.cart);
    this.setState({
      cart: updatedCart
    });
  },

  completeCheckout: function(e){
    this.setState({
      customerDetails: e,
      cart: _.vector(),
      page: 'thank-you'
    });
  },

  getPageComponent: function(page){
    switch(page){
    case 'catalog':
      return <Catalog
          products={this.state.catalog}
          onProductAdd={this.addProductToCart} />;
    case 'cart':
      return <Cart
          products={this.state.cart}
          onNavigate={this.setPage}
          onItemQtyChange={this.changeCartItemQuantity}
          onItemRemove={this.removeCartItem} />
    case 'checkout':
      return <Checkout onNavigate={this.setPage} onOrderPlaced={this.completeCheckout} />;
    case 'thank-you':
      return <ThankYou onNavigate={this.setPage} order={this.state.customerDetails} />;

    }
  },

  render: function(){
    return (
      <div className="shopping-cart">
        { this.getPageComponent(this.state.page) }
      </div>
    );
  }

});

module.exports = ShoppingCart;