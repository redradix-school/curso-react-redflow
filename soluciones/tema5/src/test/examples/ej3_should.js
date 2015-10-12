var should = require('should');

describe('Suite con should', function(){

  var user = {
    name: 'Carlos',
    pets: ['Mia', 'Leia', 'Rocky', 'Orco']
  }

  it('Should assert properties', function(){
    user.should.have.property('name', 'Carlos');
  });

  it('Should assert on Arrays', function(){
    user.should.have.property('pets').with.length(4);
  });

  it('Should assert on types', function(){
    user.should.be.an.Object;
    user.pets.should.be.an.Array;
  });

  it('Should allow negations', function(){
    user.should.not.have.property('foo');
  });

  it('Should assert on Booleans', function(){
    (false).should.be.false;
    (false).should.not.be.ok;
    (true).should.be.true;
    (true).should.be.ok;
  });

  it('Should match with regular expressions', function(){
    var subject = 'hola mundo';
    subject.should.match(/hola/);
    subject.should.not.match(/^mundo$/);
    subject.should.match(/.*mundo/);
  });

});