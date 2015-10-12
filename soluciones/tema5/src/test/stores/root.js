var _ = require('mori'),
    should = require('should'),
    atom = require('../../lib/atom_state'),
    rewire = require('rewire'),
    Dispatcher = require('../../lib/dispatcher');


describe('Root Store', function(){
  var subject;
  var fakeState = {
    page: 'foo'
  };

  before(function(){
    //Dispatcher.removeAllListeners();
    subject = rewire('../../stores/root');
    atom.silentSwap(_.toClj(fakeState));
  });

  it('Should return the current page', function(){
    var page = subject.getPage(atom.getState());
    page.should.equal(fakeState.page);
  });

  it('Should store the new page when receiving SET:PAGE', function(){
    Dispatcher.emit('SET:PAGE', 'changed');
    atom.getIn(['page']).should.equal('changed');
  });

  it('Should store the thank-you page when receiving ORDER:COMPLETE', function(){
    Dispatcher.emit('ORDER:COMPLETE');
    atom.getIn(['page']).should.equal('thank-you');
  });
});
