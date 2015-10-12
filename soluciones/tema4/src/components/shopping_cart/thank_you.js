var React = require('react'),
    _ = require('mori'),
    Dispatcher = require('../../lib/dispatcher'),
    OrderStore = require('../../stores/order');

var ThankYou = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  onBackButtonClick: function(e){
    e.preventDefault();
    Dispatcher.emit("SET:PAGE", "catalog");
  },
  render: function(){
    var order = OrderStore.getOrderDetails(this.props.state),
        customerName = _.get(order, 'name');
    return (
      <div className="thank-you">
        <div className="thank-you-header">
          <h2>¡Gracias por tu compra {customerName}!</h2>
        </div>
        <p>Tu compra llegará pronto, muy pronto.</p>
        <p><a href="#" className="button" onClick={this.onBackButtonClick}>Volver</a></p>
      </div>
    );
  }
});
module.exports = ThankYou;