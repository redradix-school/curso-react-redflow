var Promise = require('bluebird');
var Dispatcher = require('../lib/dispatcher');


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
          }, 100);
        }
        else {
          rej(xhr.statusText);
        }
      }

      xhr.send();
    });
  },

  //Dispatcher-based version
  loadCatalogData: Dispatcher.listen("CATALOG:SERVICE:LOAD", function(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', catalogUrl);
    xhr.onload = function(){
      if(xhr.status === 200){
        Dispatcher.emit("CATALOG:LOAD:COMPLETE", JSON.parse(xhr.response));
      }
      else {
       Dispatcher.emit("CATALOG:LOAD:ERROR", xhr.status, xhr.statusText);
      }
    }

    xhr.send();
  })

}

module.exports = ShoppingCartService;