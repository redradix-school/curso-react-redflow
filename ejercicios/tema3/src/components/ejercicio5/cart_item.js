var React = require('react'),
    _ = require('mori');

var CartItem = React.createClass({
  propTypes: {
    product: React.PropTypes.object.isRequired,
    onQuantityChange: React.PropTypes.func.isRequired,
    onProductRemove: React.PropTypes.func.isRequired
  },
  updateQuantity: function(n, e){
    e.preventDefault();
    this.props.onQuantityChange({
      product: this.props.product,
      quantity: n
    });
  },
  removeItem: function(e){
    e.preventDefault();
    this.props.onProductRemove({
      product: this.props.product
    });
  },
  render: function(){
    var p = this.props.product;
    return (
      <tr>
        <td className="qty">{ _.get(p, 'qty') }</td>
        <td className="description">
          <h3>{ _.get(p, 'name') }</h3>
           <p>{ _.get(p, 'description') }</p>
        </td>
        <td className="unit-price">{ _.get(p, 'price') } €</td>
        <td className="subtotal">{ (_.get(p, 'price')*_.get(p, 'qty')).toFixed(2) }€</td>
        <td className="actions">
          <a className="button" onClick={ _.partial(this.updateQuantity, 1) }> + </a>
          <a className="button" onClick={ _.partial(this.updateQuantity, -1) }> - </a>
          <a className="button" onClick={ this.removeItem }>Eliminar</a>
        </td>
      </tr>
    );
  }
});

module.exports = CartItem;