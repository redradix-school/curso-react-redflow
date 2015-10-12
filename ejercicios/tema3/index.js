var statik = require('statik');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

//servidor web estático
statik({
  port: 3000,
  root: __dirname
});


//compilador JSX / ES2015
var compiler = webpack(webpackConfig);

compiler.watch({
  aggregateTimeout: 300
}, function(err,stats){
  if(err){
    console.log('Error compilando');
    console.error(err);
  }
  else {
    console.log('Webpack - Compilación completada correctamente');
    var statsJSON = stats.toJson();
    if(stats.hasErrors()){
      console.log('Webpack - Errores en la compilación');
      console.error(statsJSON.errors.join('\n'));
    }
    if(stats.hasWarnings()){
      console.warn('Webpack - Warnings en la compilación');
      console.warn(statsJSON.warnings.join('\n'));
    }
    console.log('\nEsperando cambios...');
  }
});

console.log('Sirviendo contenido en http://localhost:3000');