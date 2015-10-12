var React = require('react'),
    _ = require('mori');

var Checkout = React.createClass({
  propTypes: {
    onOrderPlaced: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      name: '',
      lastname: '',
      email: '',
      address: '',
      errors: {}
    };
  },
  goBackToCart: function(e){
    this.props.onNavigate('cart');
  },
  getFieldClass: function(field, defaultClass){
    defaultClass || (defaultClass = '');
    return this.state.errors[field] !== undefined ? defaultClass + ' error' : defaultClass;
  },
  validateForm: function(e){
    var errors = {};
    if(this.state.name.trim() === ''){
      errors.name = 'El nombre es obligatorio';
    }
    if(this.state.lastname.trim() === ''){
      errors.lastname = 'El apellido es obligatorio';
    }
    if(this.state.email.trim() === '' || this.state.email.indexOf('@') === -1){
      errors.email = 'Debe introducir un email';
    }
    if(this.state.address.trim() === ''){
      errors.address = '¿Dónde te lo mandamos sin dirección?'
    }

    if(Object.keys(errors).length > 0){
      this.setState({ errors: errors });
    }
    else {
      this.props.onOrderPlaced(_.hashMap(
        'name', this.state.name,
        'lastname', this.state.lastname,
        'email', this.state.email,
        'address', this.state.address
      ));
    }
  },
  onTextChange: function(fieldName, e){
    var newState = {};
    newState[fieldName] = e.target.value;
    this.setState(newState);
  },
  render: function(){
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
              <span className="error-text">{this.state.errors.name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Apellidos</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="lastname" value={this.state.lastname} onChange={_.partial(this.onTextChange, 'lastname')}  className={this.getFieldClass('lastname')}  />
              <span className="error-text">{this.state.errors.lastname}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Email</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="email" value={this.state.email} onChange={_.partial(this.onTextChange, 'email')}  className={this.getFieldClass('email')} />
              <span className="error-text">{this.state.errors.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Dirección</label>
            </div>
            <div className="col two-thirds">
              <textarea name="address" value={this.state.address} onChange={_.partial(this.onTextChange, 'address')} className={this.getFieldClass('address', 'big')}></textarea>
              <span className="error-text">{this.state.errors.address}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-whole">
              <button className="button" onClick={this.goBackToCart}>Volver al carrito</button>
              <button className="button" onClick={this.validateForm}>Finalizar</button>
            </div>
          </div>
        </div>
    </div>
    );
  }
});
module.exports = Checkout;