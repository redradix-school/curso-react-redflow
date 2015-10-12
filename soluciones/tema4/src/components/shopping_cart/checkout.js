var React = require('react'),
    _ = require('mori'),
    Dispatcher = require('../../lib/dispatcher'),
    OrderStore = require('../../stores/order');

var Checkout = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      name: '',
      lastname: '',
      email: '',
      address: ''
    };
  },
  goBackToCart: function(e){
    Dispatcher.emit("SET:PAGE", "cart");
  },
  getFieldClass: function(field, defaultClass){
    var errors = OrderStore.getFormErrors(this.props.state);
    defaultClass || (defaultClass = '');
    return _.hasKey(errors, field) ? defaultClass + ' error' : defaultClass;
  },
  handleSubmit: function(e){
    Dispatcher.emit("ORDER:SAVE", _.hashMap(
      'name', this.state.name,
      'lastname', this.state.lastname,
      'email', this.state.email,
      'address', this.state.address
    ));
  },
  onTextChange: function(fieldName, e){
    var newState = {};
    newState[fieldName] = e.target.value;
    this.setState(newState);
  },
  render: function(){
    var errors = OrderStore.getFormErrors(this.props.state);

    return (
      <div className="checkout">
        <div className="checkout-header"><h2>Finalizar compra</h2></div>
        <div className="checkout-form">
          <div className="row">
            <div className="col one-third">
              <label>Nombre</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="name" value={this.state.name} onChange={_.partial(this.onTextChange, 'name')} className={this.getFieldClass('name')} />
              <span className="error-text">{ _.get(errors, 'name') }</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Apellidos</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="lastname" value={this.state.lastname} onChange={_.partial(this.onTextChange, 'lastname')}  className={this.getFieldClass('lastname')}  />
              <span className="error-text">{ _.get(errors, 'lastname') }</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Email</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="email" value={this.state.email} onChange={_.partial(this.onTextChange, 'email')}  className={this.getFieldClass('email')} />
              <span className="error-text">{ _.get(errors, 'email') }</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Dirección</label>
            </div>
            <div className="col two-thirds">
              <textarea name="address" value={this.state.address} onChange={_.partial(this.onTextChange, 'address')} className={this.getFieldClass('address', 'big')}></textarea>
              <span className="error-text">{ _.get(errors, 'address') }</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-whole">
              <a className="button" href='/cart'>Volver al carrito</a>
              <button className="button" onClick={this.handleSubmit}>Finalizar</button>
            </div>
          </div>
        </div>
    </div>
    );
  }
});
module.exports = Checkout;