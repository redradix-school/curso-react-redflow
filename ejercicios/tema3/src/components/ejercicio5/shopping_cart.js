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
      //current page (either 'catalog', 'cart', 'checkout' or 'thank-you')
      page: 'catalog',
      //all products in the catalog
      catalog: _.toClj(data.products),
      //products in the cart
      cart: _.vector(),
      //user details
      customerdetails: _.hashMap()
    };
  },
  //changes current page
  setPage: function(newPage){
    this.setState({ page: newPage });
  },

  //adds a product to the cart (from CartItem)
  addProductToCart: function(e){
    var p = e.product,
        cartItems = this.state.cart;
    var updatedCart = addProductToCart(p, cartItems);

    this.setState({
      cart: updatedCart,
      page: 'cart'
    });
  },

  //changes an item's quantity in the cart
  changeCartItemQuantity: function(e){
    var updatedCart = updateProductQtyInCart(e.product, e.quantity, this.state.cart);
    this.setState({
      cart: updatedCart
    });
  },

  //removes an item from the cart
  removeCartItem: function(e){
    var updatedCart = removeProductInCartById(_.get(e.product, 'id'), this.state.cart);
    this.setState({
      cart: updatedCart
    });
  },

  //saves customer details and redirects to thank you
  completeCheckout: function(e){
    this.setState({
      customerDetails: e,
      cart: _.vector(),
      page: 'thank-you'
    });
  },

  //select component to show based on "page"
  getPageComponent: function(page){
    switch(page){
    case 'catalog':
      return <Catalog
          products={ null /* TODO */ }
          onProductAdd={ null /* TODO */ } />;
    case 'cart':
      return <Cart
          products={ null /* TODO */ }
          onNavigate={ null /* TODO */ }
          onItemQtyChange={ null /* TODO */ }
          onItemRemove={ null /* TODO */} />
    case 'checkout':
      return <Checkout onNavigate={ null /* TODO */ } onOrderPlaced={ null/* TODO */ } />;
    case 'thank-you':
      return <ThankYou onNavigate={ null/* TODO */ } order={ null/* TODO */} />;

    }
  },

  //render the proper component for the current page
  render: function(){
    return (
      <div className="shopping-cart">
        { this.getPageComponent(this.state.page) }
      </div>
    );
  }

});

module.exports = ShoppingCart;