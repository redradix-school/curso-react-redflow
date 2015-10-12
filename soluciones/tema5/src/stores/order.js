var _ = require('mori'),
    atom = require('../lib/atom_state'),
    Dispatcher = require('../lib/dispatcher');

var p = {
  order: ['data', 'order'],
  formValid: ['ui', 'checkout', 'formValid'],
  formErrors: ['ui', 'checkout', 'formErrors']
};

var OrderStore = {
  getFormErrors: function(state){
    return _.getIn(state, p.formErrors);
  },

  getOrderDetails: function(state){
    return _.getIn(state, p.order);
  },

  validateDetails: Dispatcher.listen("ORDER:SAVE", function(detailsMap){
    var errors = _.hashMap();
    if(_.get(detailsMap, 'name').trim() === ''){
      errors = _.assoc(errors, 'name', 'El nombre es obligatorio');
    }
    if(_.get(detailsMap, 'lastname').trim() === ''){
      errors = _.assoc(errors, 'lastname', 'El apellido es obligatorio');
    }
    if(_.get(detailsMap, 'email').trim() === '' ||
        _.get(detailsMap, 'email').indexOf('@') === -1){
      errors = _.assoc(errors, 'email', 'Debe introducir un email válido');
    }
    if(_.get(detailsMap, 'address').trim() === ''){
      errors = _.assoc(errors, 'address', 'Por favor introduzca una dirección de envío');
    }

    if(_.count(errors) > 0){
      atom.assocIn(p.formErrors, errors);
    }
    else {
      //remove any errors
      atom.silentAssocIn(p.formErrors, errors);
      //save the order - the user details in fact
      atom.assocIn(p.order, detailsMap);
      //this order is now complete
      Dispatcher.emit("ORDER:COMPLETE");
    }
  })

};

module.exports = OrderStore;