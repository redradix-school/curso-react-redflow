var React = require('react'),
    CartItem = require('./cart_item'),
    _ = require('mori');



function calculateTotal(items){
  return _.reduce(function(acc, item){
    return acc + _.get(item, 'price')*_.get(item, 'qty');
  }, 0, items);
}

var Cart = React.createClass({
  propTypes: {
    products: React.PropTypes.object.isRequired,
    onItemQtyChange: React.PropTypes.func.isRequired,
    onItemRemove: React.PropTypes.func.isRequired,
    onNavigate: React.PropTypes.func.isRequired
  },
  renderCartItems: function(products){
    var self = this;
    return _.intoArray(_.map(function(p){
      return (
        <CartItem key={_.get(p, 'id') }
          product={p}
          onQuantityChange={self.props.onItemQtyChange}
          onProductRemove={self.props.onItemRemove} />
      );
    }, products));
  },
  renderEmptyCartMessage: function(){
    return (<td colSpan="5" className='cart-empty'>Su carrito está vacío</td>);
  },
  renderCartSummary: function(){
    var total = calculateTotal(this.props.products);

    return (<tr className="summary">
              <td colSpan="4" className="total">
                { total.toFixed(2) } €
              </td>
              <td></td>
            </tr>);
  },
  gotoCatalog: function(e){
    e.preventDefault();
    this.props.onNavigate('catalog');
  },
  gotoCheckout: function(e){
    e.preventDefault();
    this.props.onNavigate('checkout');
  },
  render: function(){
    var itemCount = _.count(this.props.products),
        emptyCartMessage = this.renderEmptyCartMessage(),
        cartSummary = this.renderCartSummary(),
        items = this.renderCartItems(this.props.products);

    return (
      <div className="cart">
        <div className="cart-header"><h2>Tu compra</h2></div>
        <div className="cart-contents">
        <table cellSpacing="0">
          <thead>
            <tr>
              <th className="qty">Cant</th>
              <th className="description">Product</th>
              <th className="unit-price">Price</th>
              <th className="subtotal">Total</th>
              <th className="actions"></th>
            </tr>
          </thead>
          <tbody>
          { itemCount ? items : emptyCartMessage }
          { itemCount ? cartSummary : null }
          </tbody>
        </table>
      </div>
      <div className="footer">
        <a className="button" onClick={this.gotoCatalog}>Seguir comprando</a>
        { itemCount ? <a className="button" onClick={this.gotoCheckout}>Finalizar compra</a> : null }
      </div>
    </div>
    );
  }
});

module.exports = Cart;