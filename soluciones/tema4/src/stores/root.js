var _ = require('mori'),
    atom = require('../lib/atom_state'),
    page = require('page'),
    Dispatcher = require('../lib/dispatcher');


var p = {
  page: ['page']
};

var RootStore = {
  getPage: function(state){
    return _.getIn(state, p.page);
  },

  setPage: Dispatcher.listen("SET:PAGE", function(newPage){
    atom.assocIn(p.page, newPage);
  }),

  orderComplete: Dispatcher.listen("ORDER:COMPLETE", function(){
    atom.assocIn(p.page, 'thank-you');
  })
};

module.exports = RootStore;