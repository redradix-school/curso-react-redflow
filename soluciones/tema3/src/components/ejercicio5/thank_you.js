var React = require('react'),
    _ = require('mori');

var ThankYou = React.createClass({
  propTypes: {
    order: React.PropTypes.object.isRequired,
    onNavigate: React.PropTypes.func.isRequired
  },
  onBackButtonClick: function(e){
    e.preventDefault();
    this.props.onNavigate('catalog');
  },
  render: function(){
    var customerName = _.get(this.props.order, 'name');
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