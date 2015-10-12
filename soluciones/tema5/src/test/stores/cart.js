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
    var results = subject.getCartProducts(state);
    //mori assertions
    _.count(results).should.equal(1);
    _.get(_.first(results), 'name').should.equal('test product');
  });

  it('getCartTotal query should return the cart total price', function(){
    var state = atom.getState();
    var totalPrice = subject.getCartTotal(state);
    totalPrice.should.equal(20);
  });

  it('addProduct command should add a new product to the cart with quantity 1', function(){
    var product = { id: 2, name: 'foo', price: 25 };
    Dispatcher.emit('CART:ADD', _.toClj(product));
    _.count(atom.getIn(p.items)).should.equal(2);
    _.get(_.last(atom.getIn(p.items)), 'qty').should.equal(1);
  });

  it('addProduct command should update quantity for product already in the cart', function(){
    var product = { id: 2, name: 'foo', price: 25 };
    Dispatcher.emit('CART:ADD', _.toClj(product));
    Dispatcher.emit('CART:ADD', _.toClj(product));
    _.count(atom.getIn(p.items)).should.equal(2);
    _.get(_.last(atom.getIn(p.items)), 'qty').should.equal(2);
  });

  it('removeProduct command should remove the product from the cart', function(){
    var product = _.toClj(fakeState.data.cart[0]);
    Dispatcher.emit('CART:REMOVE', product);
    _.count(atom.getIn(p.items)).should.equal(0);
  });

  it('changeQuantity command should update a product\'s quantity in the cart', function(){
    var productInCart = _.first(atom.getIn(p.items));
    Dispatcher.emit('CART:CHANGE:QTY', productInCart, 4);
    var newProductInCart = _.first(atom.getIn(p.items));
    _.get(newProductInCart, 'qty').should.equal(6);
  });

  it('emptyCart command should remove all products in the cart', function(){
    Dispatcher.emit('ORDER:COMPLETE');
    _.count(atom.getIn(p.items)).should.equal(0);
  });



});