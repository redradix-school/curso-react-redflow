var should = require('should');
var sinon = require('sinon');

//Ejemplo mocking
var myModule = {
  add: function(a,b){
    return a+b;
  },
  multiply: function(a,b){
    var res = 0;
    for(var i=b; i > 0; i--){
      res = this.add(res,a);
    }
    return res;
  }
}

var otherModule = {
  doSomething: function(a,b){
    if(myModule.multiply(a,b) >= 10){
      return 10;
    }
    else {
      return 1;
    }
  }
}


describe('Mocking example', function(){
  var subject = myModule;
  var addSpy = sinon.spy(myModule, 'add');

  beforeEach(function(){
    addSpy.reset();
  });

  it('add() should add two numbers', function(){
    var res = subject.add(1,2);
    addSpy.called.should.be.true;
    res.should.equal(3);
  });

  it('multiply() should multiply two numbers', function(){
    var res = subject.multiply(2,5);
    res.should.equal(10);
  });

  it('multiply(a,b) should call add b times', function(){
    var res = subject.multiply(5,4);
    addSpy.callCount.should.equal(4);
    var firstCall = addSpy.getCall(0);
    firstCall.args[0].should.equal(0);
    firstCall.args[1].should.equal(5);
  });

  it('otherModule should return 1 if multiply < 10', function(){
    var stub = sinon.stub(myModule, 'multiply', function(){
      return 0;
    });
    var res = otherModule.doSomething(1,1);
    res.should.equal(1);

  });
});