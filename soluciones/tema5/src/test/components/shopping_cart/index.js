var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    Dispatcher = require('../../../lib/dispatcher');


describe('ShoppingCart', function(){
  var dom, subject, revert;
  var RootStoreMock = {
    getPage: function(state){
      return state.page;
    }
  };

  var CatalogMock = utils.generateMockComponent('catalog');
  var CartMock = utils.generateMockComponent('cart');
  var CheckoutMock = utils.generateMockComponent('checkout');
  var ThankYouMock = utils.generateMockComponent('thankyou');

  before(function(){
    Dispatcher.removeAllListeners();
    subject = rewire('../../../components/shopping_cart/index');
    revert = subject.__set__({
      RootStore: RootStoreMock,
      Catalog: CatalogMock,
      Cart: CartMock,
      Checkout: CheckoutMock,
      ThankYou: ThankYouMock
    });
  });

  after(function(){
    revert();
  });

  it('Should render proper component for current page', function(){
    dom = utils.renderWithState(subject, { page: 'catalog' });
    var catalog = utils.findChildComponent(dom, CatalogMock);
    catalog.should.be.an.Object;

    dom = utils.renderWithState(subject, { page: 'cart'});
    var cart = utils.findChildComponent(dom, CartMock);
    cart.should.be.an.Object;

    dom = utils.renderWithState(subject, { page: 'checkout'});
    var checkout = utils.findChildComponent(dom, CheckoutMock);
    checkout.should.be.an.Object;

    dom = utils.renderWithState(subject, { page: 'thank-you'});
    var thankyou = utils.findChildComponent(dom, ThankYouMock);
    thankyou.should.be.an.Object;

  });


});