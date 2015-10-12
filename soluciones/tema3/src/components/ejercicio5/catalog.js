var React = require('react'),
    _ = require('mori'),
    CatalogItem = require('./catalog_item');

var Catalog = React.createClass({
  propTypes: {
    products: React.PropTypes.object.isRequired,
    onProductAdd: React.PropTypes.func.isRequired
  },
  renderItems: function(){
    var self = this;
    return _.intoArray(_.map(function(product){
      return <CatalogItem key={_.get(product, 'id')} product={product} onAddToCart={self.props.onProductAdd} />;
    }, this.props.products));
  },
  render: function(){
    return (
      <div className="catalog">
        <div className="catalog-header">
          <h2>Productos</h2>
        </div>
        <div className="catalog-list">
        { this.renderItems() }
        </div>
        <div className="footer"></div>
      </div>
    )
  }
});

module.exports = Catalog;