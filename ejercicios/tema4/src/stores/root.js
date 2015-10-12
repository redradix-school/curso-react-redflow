var _ = require('mori'),
    atom = require('../lib/atom_state'),
    page = require('page'),
    Dispatcher = require('../lib/dispatcher');


var p = {
  page: ['page']
};

var RootStore = {
  getPage: function(state){
    /* TODO */
  },

  setPage: Dispatcher.listen("SET:PAGE", function(newPage){
    /* TODO */
  }),

  orderComplete: Dispatcher.listen("ORDER:COMPLETE", function(){
    /* TODO */
  })
};

module.exports = RootStore;