var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../utils/react.utils.js'),
    _ = require('mori');


describe('Cart component', function(){

  //mori collection with fake products
  var fakeProducts = _.toClj([
    { id: 1, name: 'p1'},
    { id: 2, name: 'p2'},
    { id: 3, name: 'p3'}
  ]);

  var CartStoreMock = {
    /* TODO */
  }

  var DispatcherMock = {
    /* TODO */
  }

  var CartItemMock = utils.generateMockComponent('cart-item');

  var subject, revert;

  before(function(){
    subject = rewire('../../components/shopping_cart/cart');
    revert = subject.__set__({
      Dispatcher: DispatcherMock,
      CartStore: CartStoreMock,
      CartItem: CartItemMock
    });
  });

  after(function(){
    revert();
  });

  beforeEach(function(){
    /* TODO */
  });

  it('Should render a table with one CartItem per product', function(){
    /* TODO */
  });

  it('Should render the cart total price', function(){
    /* TODO */
  });

  it('Should render the empty message if cart is empty', function(){
    /* TODO */
  });

  it('Should Dispatch correct page change when clicking on Continue Shopping', function(){
    /* TODO */
  });

  it('Should Dispatch correct page change when clicking on Checkout', function(){
    /* TODO */
  });

});