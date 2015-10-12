var React = require('react'),
    _ = require('mori'),
    Dispatcher = require('../../lib/dispatcher'),
    CartStore = require('../../stores/cart'),
    CartItem = require('./cart_item');

var Cart = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  renderCartItems: function(products){
    return _.intoArray(_.map(function(p){
      return (
        <CartItem key={_.get(p, 'id') } product={p} />
      );
    }, products));
  },
  renderEmptyCartMessage: function(){
    return (<td colSpan="5" className='cart-empty'>Su carrito está vacío</td>);
  },
  renderCartSummary: function(total){
    return (<tr className="summary">
              <td colSpan="4" className="total">
                { total.toFixed(2) } €
              </td>
              <td></td>
            </tr>);
  },
  gotoCatalog: function(e){
    e.preventDefault();
    Dispatcher.emit("SET:PAGE", "catalog");
  },
  gotoCheckout: function(e){
    e.preventDefault();
    Dispatcher.emit("SET:PAGE", "checkout");
  },
  render: function(){
    //data from stores
    var products = CartStore.getCartProducts(this.props.state),
        total = CartStore.getCartTotal(this.props.state);

    //components
    var itemCount = _.count(products),
        emptyCartMessage = this.renderEmptyCartMessage(),
        cartSummary = this.renderCartSummary(total),
        items = this.renderCartItems(products);

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