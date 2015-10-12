var _ = require('mori'),
    should = require('should'),
    rewire = require('rewire'),
    atom = require('../../lib/atom_state'),
    Dispatcher = require('../../lib/dispatcher');

describe('Cart Store', function(){
  var subject, p;
  var fakeState = {
    data: {
      cart: [
        {
          id: 1,
          name: 'test product',
          qty: 2,
          price: 10
        }
      ]
    }
  }

  before(function(){
    Dispatcher.removeAllListeners();
    subject = rewire('../../stores/cart');
    //we extract p so we can use the Store shortcut for atom queries
    p = subject.__get__('p');
  });

  beforeEach(function(){
    atom.swap(_.toClj(fakeState));
  });

  it('getCartProducts query should return cart products', function(){
    var state = atom.getState();
    /* TODO */
  });

  it('getCartTotal query should return the cart total price', function(){
    var state = atom.getState();
    /* TODO */
  });

  it('addProduct command should add a new product to the cart with quantity 1', function(){
    /* TODO */
  });

  it('addProduct command should update quantity for product already in the cart', function(){
    /* TODO */
  });

  it('removeProduct command should remove the product from the cart', function(){
    /* TODO */
  });

  it('changeQuantity command should update a product\'s quantity in the cart', function(){
    /* TODO */
  });

  it('emptyCart command should remove all products in the cart', function(){
    /* TODO */
  });



});