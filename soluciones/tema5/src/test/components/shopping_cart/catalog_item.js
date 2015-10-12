var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');


describe('CatalogItem', function(){
  var subject, revert, dom;

  var DispatcherMock = {
    emit: sinon.spy()
  }

  var productMock = {
    id: 1,
    name: 'foo',
    description: 'foo description',
    price: 0.99
  };

  before(function(){
    subject = rewire('../../../components/shopping_cart/catalog_item');
    revert = subject.__set__('Dispatcher', DispatcherMock);
    dom = utils.renderWithProps(subject, { product: _.toClj(productMock) });
  });

  after(function(){
    revert();
  });

  beforeEach(function(){
    DispatcherMock.emit.reset();
  });

  it('Should render the product\'s name, description and price', function(){
    var name = utils.findDOMNodeWithClass(dom, 'product-title');
    var description = utils.findDOMNodeWithClass(dom, 'product-description');
    //find nested <p> in the description component "tree"
    var descriptionText = utils.findDOMNodeWithTag(description, 'p');
    var price = utils.findDOMNodeWithClass(dom, 'product-price');

    name.should.be.an.Object;
    description.should.be.an.Object;
    price.should.be.an.Object;

    name.props.children.should.equal(productMock.name);
    descriptionText.props.children.should.equal(productMock.description);
    price.props.children[0].should.equal(productMock.price);

  });

  it('Should Dispatch CART:ADD when clicking on add to cart button', function(){
    var addToCartButton = utils.findDOMNodeWithClass(dom, 'button'),
        buttonNode = React.findDOMNode(addToCartButton);

    TestUtils.Simulate.click(buttonNode);
    DispatcherMock.emit.callCount.should.equal(2);
    var firstCall = DispatcherMock.emit.getCall(0);
    firstCall.args[0].should.equal('CART:ADD');
    _.equals(_.toClj(productMock), firstCall.args[1]).should.be.true;
  });

  it('Should Dispatch SET:PAGE when clicking on add to cart button', function(){
    var addToCartButton = utils.findDOMNodeWithClass(dom, 'button'),
        buttonNode = React.findDOMNode(addToCartButton);

    TestUtils.Simulate.click(buttonNode);
    DispatcherMock.emit.callCount.should.equal(2);
    var secondCall = DispatcherMock.emit.getCall(1);
    secondCall.args[0].should.equal('SET:PAGE');
    secondCall.args[1].should.equal('cart');
  });

});