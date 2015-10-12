var Promise = require('bluebird');
var catalogUrl = '/data/catalog.json';

var ShoppingCartService = {

  //promise version
  loadCatalogDataPromise: function(){
    return new Promise(function(res, rej){
      var xhr = new XMLHttpRequest();

      xhr.open('GET', catalogUrl);
      xhr.onload = function(){
        if(xhr.status === 200){
          //un pequeño retardo
          setTimeout(function(){
            res(JSON.parse(xhr.response));
          }, 500);
        }
        else {
          rej(xhr.statusText);
        }
      }

      xhr.send();
    });
  }
}

module.exports = ShoppingCartService;