var React = require('react'),
    _ = require('mori'),
    Dispatcher = require('../../lib/dispatcher');


var CatalogItem = React.createClass({
  propTypes: {
    product: React.PropTypes.object.isRequired
  },
  onAddClick: function(e){
    /* TODO */
  },
  render: function(){
    var product = this.props.product;
    return (
      <div className="product row">
        <div className="product-summary col three-fourths">
          <h2 className="product-title">{ _.get(product, 'name') }</h2>
          <div className="product-details">
            <div className="product-image col one-fourth">
              <img src="http://placehold.it/64x64" height="64" width="64" />
            </div>
            <div className="product-summary col three-fourths">
              <p>{ _.get(product, 'description') }</p>
            </div>
          </div>
        </div>
        <div className="product-add-to-cart col one-fourth">
          <div className="product-price">{ _.get(product, 'price') }€</div>
          <div className="add-to-cart">
            <a className="button" onClick={this.onAddClick} href='/cart'>Comprar</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CatalogItem;