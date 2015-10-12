var _ = require('mori'),
    should = require('should'),
    rewire = require('rewire'),
    sinon = require('sinon'),
    atom = require('../../lib/atom_state'),
    Dispatcher = require('../../lib/dispatcher');


describe('Order Store', function(){
  var subject, p;

  var fakeErrors = {
    name: 'name is wrong',
    lastname: 'lastname is even worse',
    email: 'that is not an email',
    address: 'address is too short'
  };

  var fakeDetails = {
    name: '',
    lastname: '',
    email: '',
    address: ''
  };

  before(function(){
    Dispatcher.removeAllListeners();
    subject = rewire('../../stores/order');
    p = subject.__get__('p');
  });

  it('getFormErrors should retrieve current validation errors', function(){
    atom.assocIn(p.formErrors, _.toClj(fakeErrors));
    var res = subject.getFormErrors(atom.getState());
    _.get(res, 'name').should.equal(fakeErrors.name);
    _.get(res, 'lastname').should.equal(fakeErrors.lastname);
    _.get(res, 'email').should.equal(fakeErrors.email);
    _.get(res, 'address').should.equal(fakeErrors.address);
  });

  it('getOrderDetails should retrieve saved order data', function(){
    atom.assocIn(p.order, _.toClj({ name: 'foo' }));
    var order = subject.getOrderDetails(atom.getState());
    _.get(order, 'name').should.equal('foo');
  });

  it('validateDetails should validate name is not empty', function(){
    Dispatcher.emit('ORDER:SAVE', _.toClj(fakeDetails));
    atom.getIn(p.formErrors.concat(['name'])).length.should.be.greaterThan(0);
  });

  it('validateDetails should validate lastname is not empty', function(){
    Dispatcher.emit('ORDER:SAVE', _.toClj(fakeDetails));
    atom.getIn(p.formErrors.concat(['lastname'])).length.should.be.greaterThan(0);
  });

  it('validateDetails should validate email is not empty and looks like an email', function(){
    Dispatcher.emit('ORDER:SAVE', _.toClj(fakeDetails));
    atom.getIn(p.formErrors.concat(['email'])).length.should.be.greaterThan(0);
  });

  it('validateDetails should validate address is not empty', function(){
    Dispatcher.emit('ORDER:SAVE', _.toClj(fakeDetails));
    atom.getIn(p.formErrors.concat(['address'])).length.should.be.greaterThan(0);
  });

  it('validateDetails should save order details and dispatch ORDER:COMPLETE if validation success', function(){
    var emitSpy = sinon.spy(Dispatcher, 'emit');
    var validDetails = {
      name: 'Bugs',
      lastname: 'Bunny',
      email: 'lookslike@bunny.com',
      address: 'a hole'
    };
    Dispatcher.emit('ORDER:SAVE', _.toClj(validDetails));
    //assert there are no errors
    _.count(atom.getIn(p.formErrors)).should.equal(0);
    //assert order is saved
    var order = atom.getIn(p.order);
    _.get(order, 'name').should.equal(validDetails.name);
    //assert dispatch - first is our ORDER:SAVE, second is what we're checking
    emitSpy.callCount.should.equal(2);
    emitSpy.getCall(1).args[0].should.equal('ORDER:COMPLETE');
    emitSpy.restore();
  });
});