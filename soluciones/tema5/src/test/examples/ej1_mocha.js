describe('Mi primera suite', function(){
  before(function(){
    //console.log('Hola antes de nada...');
  });

  after(function(){
    //console.log('Adiós después de todo')
  });

  beforeEach(function(){
    //console.log('Hola antes de cada prueba');
  });

  afterEach(function(){
    //console.log('Adiós después de cada prueba');
  });

  it('Mi primer test', function(){
    //de momento no hago nada
  });

  it('Mi test asincrono', function(done){
    setTimeout(function(){
      //console.log('Un segundo después...');
      done();
    }, 1000);
  });

});