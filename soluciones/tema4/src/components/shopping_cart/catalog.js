var React = require('react'),
    _ = require('mori'),
    CatalogStore = require('../../stores/catalog'),
    CatalogItem = require('./catalog_item');

var Catalog = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  renderItems: function(products){
    return _.intoArray(_.map(function(product){
      return <CatalogItem key={_.get(product, 'id')} product={product} />;
    }, products));
  },

  renderLoadingText: function(){
    return <div>Cargando...</div>;
  },

  render: function(){
    var products = CatalogStore.getProducts(this.props.state);

    return (
      <div className="catalog">
        <div className="catalog-header">
          <h2>Productos</h2>
        </div>
        <div className='catalog-cart'><a href="/cart" className='button'>Ver Mi Compra</a></div>
        <div className="catalog-list">
        { _.count(products) === 0 ? this.renderLoadingText() : null }
        { this.renderItems(products) }
        </div>
        <div className="footer"></div>
      </div>
    )
  }
});

module.exports = Catalog;