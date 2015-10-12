var rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should');

describe('RootStore', function(){
  var subject, revert;

  var moriMock = {
    getIn: function(){}
  };

  var atomMock = {
    assocIn: function(){}
  }

  var dispatcherMock = {
    listen: function(message, cb){
      return cb;
    }
  }

  before(function(){
    subject = rewire('../../stores/root');
    revert = subject.__set__({
      _: moriMock,
      atom: atomMock,
      Dispatcher: dispatcherMock
    });
  });

  after(function(){
    revert();
  });

  it('Should return the current page in the atom', function(){
    var getInStub = sinon.stub(moriMock, 'getIn', function(){
      return 'alerts';
    });
    subject.getPage().should.equal('alerts');
    getInStub.restore();

  });

  it('Should store the new page in the atom', function(){
    var assocInSpy = sinon.spy(atomMock, 'assocIn');
    subject.setPage('foo');
    assocInSpy.calledOnce.should.be.true;
    assocInSpy.getCall(0).args[1].should.equal('foo');
    assocInSpy.restore();
  });

});