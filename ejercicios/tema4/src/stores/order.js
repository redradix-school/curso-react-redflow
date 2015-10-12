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
    /* TODO */
  },

  getOrderDetails: function(state){
    /* TODO */
  },

  validateDetails: Dispatcher.listen("ORDER:SAVE", function(detailsMap){
    var errors = _.hashMap();
    /* TODO */

    if(_.count(errors) > 0){
      atom.assocIn(p.formErrors, errors);
    }
    else {
      //remove any errors
      /* TODO */
      //save the order - the user details in fact
      /* TODO */
      //this order is now complete
      /* TODO */
    }
  })

};

module.exports = OrderStore;