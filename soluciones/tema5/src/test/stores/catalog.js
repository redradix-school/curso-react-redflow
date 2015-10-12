var _ = require('mori'),
    should = require('should'),
    rewire = require('rewire'),
    sinon = require('sinon'),
    atom = require('../../lib/atom_state'),
    Dispatcher = require('../../lib/dispatcher');

describe('Catalog Store', function(){
  var serviceMock = {
    loadCatalogDataPromise: function(){}
  }

  var fakeProducts = [
    { id: 1, name: 'foo1', price: 10 },
    { id: 2, name: 'foo2', price: 20 },
    { id: 3, name: 'foo3', price: 30 }
  ];

  var subject, p, revert;

  before(function(){
    Dispatcher.removeAllListeners();
    subject = rewire('../../stores/catalog');
    revert = subject.__set__('shoppingCartService', serviceMock);
    p = subject.__get__('p');
  });

  after(function(){
    revert();
  });

  beforeEach(function(){
    //empty the atom
    atom.swap(_.toClj({}));
  });

  it('getProducts should return available products', function(){
    atom.assocIn(p.products, _.toClj(fakeProducts));
    var products = subject.getProducts(atom.getState());
    _.count(products).should.equal(3);
  });

  it('loadProducts should load external product data using the shoppingCartService', function(done){
    var loadPromise = sinon.stub(serviceMock, 'loadCatalogDataPromise', function(){
      return Promise.resolve(fakeProducts);
    });
    Dispatcher.emit('CATALOG:LOAD');
    //we need to wait until next tick for the Promise to resolve
    setTimeout(function(){
      loadPromise.callCount.should.equal(1);
      _.count(atom.getIn(p.products)).should.equal(3);
      loadPromise.restore();
      done();
    },1);

  });

  it('saveProducts should store product data loaded in the atom', function(){
    Dispatcher.emit('CATALOG:LOAD:COMPLETE', fakeProducts);
    _.count(atom.getIn(p.products)).should.equal(3);
  });

});