var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');


describe('Checkout', function(){
  var subject, revert, component;

  var DispatcherMock = {
    emit: sinon.spy()
  };

  var OrderStoreMock = {
    //default behaviour: no errors
    getFormErrors: function(){
      return _.hashMap();
    }
  };

  var fakeErrors = {
    name: 'invalid name',
    lastname: 'invalid lastname',
    email: 'invalid email',
    address: 'invalid address'
  };

  //a map with name: tag pairs for every field
  var formFields = {
    name: 'input',
    lastname: 'input',
    email: 'input',
    address: 'textarea'
  };

  //returns a map with control names' as keys and control elements as values
  function getFormFieldNodes(dom){
    return Object.keys(formFields).reduce(function(acc, name){
      var componentsWithTag = utils.findDOMArrayWithTag(dom, formFields[name]);
      acc[name] = componentsWithTag.find(function(c){
        return c.props.name === name;
      });
      return acc;
    }, {});
  }

  before(function(){
    subject = rewire('../../../components/shopping_cart/checkout');
    revert = subject.__set__({
      Dispatcher: DispatcherMock,
      OrderStore: OrderStoreMock
    });
  });

  after(function(){
    revert();
  });

  afterEach(function(){
    DispatcherMock.emit.reset();
  });

  it('Should render the User Details form and allow user to type data', function(){
    component = utils.renderWithState(subject, {});
    //we produce another map with names as keys and DOM components as values
    var formFieldNodes = getFormFieldNodes(component);
    //we change every form field
    Object.keys(formFieldNodes).forEach(function(name){
      var node = React.findDOMNode(formFieldNodes[name]);
      node.value = 'foo' + name;
      TestUtils.Simulate.change(node);
      //and verify that state has been properly changed
      component.state[name].should.equal('foo'+name);
    });
  });

  it('Should dispatch ORDER:SAVE when user clicks on finish button', function(){
    component = utils.renderWithState(subject, {});
    //find finish button node
    var buttonNode = React.findDOMNode(component.refs.saveButton);
    TestUtils.Simulate.click(buttonNode);
    //verify Dispatcher.emit call
    DispatcherMock.emit.callCount.should.equal(1);
    DispatcherMock.emit.getCall(0).args[0].should.equal('ORDER:SAVE');
  });

  it('Should dispatch SET:PAGE when user clicks on cancel button', function(){
    component = utils.renderWithState(subject, {});
    //find finish button node
    var buttonNode = React.findDOMNode(component.refs.cancelButton);
    TestUtils.Simulate.click(buttonNode);
    //verify Dispatcher.emit call
    DispatcherMock.emit.callCount.should.equal(1);
    DispatcherMock.emit.getCall(0).args[0].should.equal('SET:PAGE');
    DispatcherMock.emit.getCall(0).args[1].should.equal('cart');
  });

  it('Should mark invalid fields with class error after saving', function(){
    var getFormErrorsStub = sinon.stub(OrderStoreMock, 'getFormErrors', function(){
      return _.toClj(fakeErrors);
    });
    component = utils.renderWithState(subject, {});
    //we produce another map with names as keys and DOM components as values
    var formFieldNodes = getFormFieldNodes(component);
    //verify error class is added to every node
    Object.keys(formFieldNodes).forEach(function(name){
      var formComponent = formFieldNodes[name];
      //prop className should contain error
      formComponent.props.className.should.match(/error/);
    });
    getFormErrorsStub.restore();
  });


});