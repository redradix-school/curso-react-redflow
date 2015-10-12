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
    /* TODO */
  },
  //checks if the given field has any error, and adds the "error" css class if it has
  //in addition to the defaultClass the field should have
  getFieldClass: function(field, defaultClass){
    defaultClass || (defaultClass = '');
    return this.state.errors[field] !== undefined ? defaultClass + ' error' : defaultClass;
  },
  //Validates form fields. If valid, it should notify the parent component with the user details
  //If invalid, it should stay in the form and mark invalid fields
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

    //check if errors object contains any property/key
    if(Object.keys(errors).length > 0){
      //handle invalid form
      /* TODO */
    }
    else {
      //handle valid form
      /* TODO */
    }
  },
  //single function to handle very text input onChange event
  //Usage hint: mori partial -> _.partial(fn, arg)
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
              <input type="text" name="name" value={this.state.name} onChange={ null/* TODO */ } className={this.getFieldClass('name')} />
              <span className="error-text">{this.state.errors.name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Apellidos</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="lastname" value={this.state.lastname} onChange={ null/* TODO */ }  className={ null/* TODO */ }  />
              <span className="error-text">{this.state.errors.lastname}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Email</label>
            </div>
            <div className="col two-thirds">
              <input type="text" name="email" value={this.state.email} onChange={ null/* TODO */}  className={ null/* TODO */} />
              <span className="error-text">{this.state.errors.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col one-third">
              <label>Dirección</label>
            </div>
            <div className="col two-thirds">
              <textarea name="address" value={this.state.address} onChange={ null/* TODO */} className={this.getFieldClass('address', 'big')}></textarea>
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