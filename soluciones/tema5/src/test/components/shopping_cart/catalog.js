var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    rewire = require('rewire'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../../utils/react.utils.js'),
    _ = require('mori');



describe('Catalog', function(){

  var fakeProducts = _.toClj([
    { id: 1, name: 'p1' },
    { id: 2, name: 'p1' },
    { id: 3, name: 'p1' }
  ]);

  var CatalogStoreMock = {
    getProducts: function(){
      return fakeProducts;
    }
  };

  var CatalogItem = utils.generateMockComponent('catalog-item');
  var stateMock = _.hashMap();
  var subject, revert;

  before(function(){
    subject = rewire('../../../components/shopping_cart/catalog');
    revert = subject.__set__({
      CatalogStore: CatalogStoreMock,
      CatalogItem: CatalogItem
    });
  });

  after(function(){
    revert();
  });

  it('Should render one CatalogItem component for each product', function(){
    var dom = utils.renderWithState(subject, stateMock);
    var itemComponents = utils.findChildComponentArray(dom, CatalogItem);
    itemComponents.should.be.an.Array;
    itemComponents.should.have.length(3);
  });

  it('Should render loading text if catalog is empty', function(){
    var getProductsStub = sinon.stub(CatalogStoreMock, 'getProducts', function(){
      return _.vector();
    });
    var dom = utils.renderWithState(subject, stateMock);
    var loadingElement = utils.findDOMNodeWithClass(dom, 'catalog-loading');
    loadingElement.should.be.an.Object;
    getProductsStub.restore();

  });
});