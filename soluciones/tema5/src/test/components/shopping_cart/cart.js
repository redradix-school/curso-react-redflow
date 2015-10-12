var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');


describe('Cart component', function(){

  //mori collection with fake products
  var fakeProducts = _.toClj([
    { id: 1, name: 'p1'},
    { id: 2, name: 'p2'},
    { id: 3, name: 'p3'}
  ]);

  var CartStoreMock = {
    getCartProducts: function(){ return fakeProducts; },
    getCartTotal: function(){ return 100.50; }
  }

  var DispatcherMock = {
    emit: sinon.spy()
  }

  var CartItemMock = utils.generateMockComponent('cart-item');

  var subject, revert;

  before(function(){
    subject = rewire('../../../components/shopping_cart/cart');
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
    DispatcherMock.emit.reset();
  });

  it('Should render a table with one CartItem per product', function(){
    var dom = utils.renderWithState(subject);
    var cartItems = utils.findChildComponentArray(dom, CartItemMock);
    cartItems.length.should.equal(3);
  });

  it('Should render the cart total price', function(){
    var dom = utils.renderWithState(subject);
    var totalPriceElement = TestUtils.findRenderedDOMComponentWithClass(dom, 'total');
    var renderedPrice = totalPriceElement.props.children[0];
    renderedPrice.should.equal(CartStoreMock.getCartTotal().toFixed(2).toString());
  });

  it('Should render the empty message if cart is empty', function(){
    var productStub = sinon.stub(CartStoreMock, 'getCartProducts', function(){
      return _.vector();
    });
    var dom = utils.renderWithState(subject);
    var emptyElement = TestUtils.findRenderedDOMComponentWithClass(dom, 'cart-empty');
    emptyElement.should.be.an.Object;
    productStub.restore();
  });

  it('Should Dispatch correct page change when clicking on Continue Shopping', function(){
    var emitSpy = DispatcherMock.emit;
    var dom = utils.renderWithState(subject);
    var footer = TestUtils.findRenderedDOMComponentWithClass(dom, 'footer');
    var footerNode = React.findDOMNode(footer);

    //Simulate.click expects a real DOM node, not a Component
    //so we get the footer node and then uses its children (standard DOM) property
    TestUtils.Simulate.click(footerNode.children[0]);

    emitSpy.called.should.equal(true);
    emitSpy.getCall(0).args[0].should.equal('SET:PAGE');
    emitSpy.getCall(0).args[1].should.equal('catalog');
  });

  it('Should Dispatch correct page change when clicking on Checkout', function(){
    var emitSpy = DispatcherMock.emit;
    var dom = utils.renderWithState(subject);
    var footer = TestUtils.findRenderedDOMComponentWithClass(dom, 'footer');
    var footerNode = React.findDOMNode(footer);

    TestUtils.Simulate.click(footerNode.children[1]);

    emitSpy.called.should.equal(true);
    emitSpy.getCall(0).args[0].should.equal('SET:PAGE');
    emitSpy.getCall(0).args[1].should.equal('checkout');
  });

});