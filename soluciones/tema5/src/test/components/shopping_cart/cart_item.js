var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');


describe('CartItem', function(){
  var DispatcherMock = {
    emit: sinon.spy()
  };

  var productMock = {
    name: 'test name',
    description:'test description',
    qty: 1,
    price: 100
  };

  var subject, revert, dom;

  before(function(){
    subject = rewire('../../../components/shopping_cart/cart_item');
    revert = subject.__set__('Dispatcher', DispatcherMock);
    //we only need a single render
    dom = utils.renderWithProps(subject, { product: _.toClj(productMock) });
  });

  after(function(){
    revert();
  });

  beforeEach(function(){
    DispatcherMock.emit.reset();
  });

  it('Should render quantity', function(){
    var qtyCell = utils.findDOMNodeWithClass(dom, 'qty');
    //children is directly the text "1"!!
    var renderedQty = qtyCell.props.children;
    renderedQty.should.equal(productMock.qty);
  });

  it('Should render name and description', function(){
    var descriptionCell = utils.findDOMNodeWithClass(dom, 'description'),
        nameNode = utils.findDOMNodeWithTag(descriptionCell, 'h3'),
        descriptionNode = utils.findDOMNodeWithTag(descriptionCell, 'p');

    nameNode.props.children.should.equal('test name');
    descriptionNode.props.children.should.equal('test description');
  });

  it('Should render unit price', function(){
    var unitPriceCell = utils.findDOMNodeWithClass(dom, 'unit-price');
    unitPriceCell.props.children[0].should.equal(productMock.price);
  });

  it('Should render subtotal', function(){
    var subtotalCell = utils.findDOMNodeWithClass(dom, 'subtotal');
    subtotalCell.props.children[0].should.equal(productMock.price.toFixed(2));
  });

  it('Should render three action buttons', function(){
    var buttons = utils.findDOMArrayWithClass(dom, 'button');
    buttons.should.be.an.Array;
    buttons.should.have.length(3);

  });

  it('Should Dispatch quantity change command when inc/dec buttons are clicked', function(){
    var buttons = utils.findDOMArrayWithClass(dom, 'button'),
        incButton = buttons[0],
        decButton = buttons[1];

    var incButtonNode = React.findDOMNode(incButton),
        decButtonNode = React.findDOMNode(decButton);

    var moriProduct = _.toClj(productMock);

    TestUtils.Simulate.click(incButtonNode);
    TestUtils.Simulate.click(decButtonNode);

    DispatcherMock.emit.callCount.should.equal(2);
    //increment quantity
    DispatcherMock.emit.getCall(0).args[0].should.equal('CART:CHANGE:QTY');
    //should send its product hashMap as Dispatcher parameter
    var emitProduct = DispatcherMock.emit.getCall(0).args[1];
    _.equals(emitProduct, moriProduct).should.be.true;
    DispatcherMock.emit.getCall(0).args[2].should.equal(1);

    //decrement quantity
    DispatcherMock.emit.getCall(1).args[0].should.equal('CART:CHANGE:QTY');
    //should send its product hashMap as Dispatcher parameter
    var emitProduct = DispatcherMock.emit.getCall(1).args[1];
    _.equals(emitProduct, moriProduct).should.be.true;
    DispatcherMock.emit.getCall(1).args[2].should.equal(-1);

  });

  it('Should Dispatch remove command when remove button is clicked', function(){
    var buttons = utils.findDOMArrayWithClass(dom, 'button'),
        removeButton = buttons[2];

    var moriProduct = _.toClj(productMock);

    TestUtils.Simulate.click(React.findDOMNode(removeButton));
    DispatcherMock.emit.callCount.should.equal(1);
    DispatcherMock.emit.getCall(0).args[0].should.equal('CART:REMOVE');
    var emitProduct = DispatcherMock.emit.getCall(0).args[1];
    _.equals(emitProduct, moriProduct).should.be.true;
  });


});