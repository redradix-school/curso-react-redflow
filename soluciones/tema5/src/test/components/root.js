//Test of components/root.js
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    should = require('should');

describe('Root', function(){
  var dom, revert, RootComponent;

  var ShoppingCartMock = React.createClass({
    render: function(){
      return (<div className='shopping-cart'></div>);
    }
  });

  var atomMock = {
    addChangeListener: function(){},
    getState: function(){
      return { foo: 'bar' };
    }
  };

  before(function(){
    RootComponent = rewire('../../components/root');
    revert = RootComponent.__set__({
      atom: atomMock,
      ShoppingCart: ShoppingCartMock
    });
  });

  after(function(){
    revert();
  });

  beforeEach(function(done){
    dom = TestUtils.renderIntoDocument(React.createElement(RootComponent));
    setTimeout(done,0);
  });

  it('Should render the ShoppingCart component', function(){
    var shoppingCart = TestUtils.scryRenderedComponentsWithType(dom, ShoppingCartMock);
    shoppingCart.length.should.equal(1);
  });

  it('Should pass the current atom state to ShoppingCart component', function(){
    var shoppingCart = TestUtils.findRenderedComponentWithType(dom, ShoppingCartMock);
    shoppingCart.props.should.have.property('state').deepEqual({foo:'bar'});
  });

});