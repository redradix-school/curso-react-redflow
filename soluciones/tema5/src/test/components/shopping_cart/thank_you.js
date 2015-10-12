var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');

describe('ThankYou', function(){
  var subject, revert, dom;
  var OrderStoreMock = {
    getOrderDetails: function(){
      return _.hashMap('name','Johnny');
    }
  };

  var DispatcherMock = {
    emit: sinon.spy()
  };

  var mockConfig = {
    'OrderStore': OrderStoreMock,
    'Dispatcher': DispatcherMock
  }

  before(function(){
    subject = rewire('../../../components/shopping_cart/thank_you');
    revert = subject.__set__(mockConfig);
    dom = utils.renderWithState(subject);
  });

  after(function(){
    revert();
  });

  it('Should render thank you message with customer name', function(){
    var h2 = utils.findDOMNodeWithTag(dom, 'h2'),
        h2Text = h2.props.children.join(' ');

    h2Text.should.match(/Johnny/);
  });

  it('Should emit SET:PAGE (catalog) when user clicks Back button', function(){
    var backButton = utils.findDOMNodeWithClass(dom, 'button');
    TestUtils.Simulate.click(React.findDOMNode(backButton));

    DispatcherMock.emit.callCount.should.equal(1);
    DispatcherMock.emit.firstCall.args[0].should.equal('SET:PAGE');
    DispatcherMock.emit.firstCall.args[1].should.equal('catalog');
  });

});