var page = require('page'),
    Dispatcher = require('./lib/dispatcher');


//page router "middleware"
function setPage(page){
  return function(ctx){
    Dispatcher.emit('SET:PAGE', page);
    ctx.handled = true;
  }
}

function configureRoutes(){
  //page routes
  page('/', setPage('catalog'));
  page('/cart', setPage('cart'));
  page('/checkout', setPage('checkout'));

  //start routing
  page({
    hashbang: true
  });
}

module.exports = {
  init: configureRoutes
}


