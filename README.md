# Curso React con datos inmutables (RedFlow)
Instalar node.js (versión 0.12.7)
https://nodejs.org/en/blog/release/v0.12.7/

NOTA: Para gestionar múltiples versiones de node.js
https://github.com/creationix/nvm

Comprobar versión de node:
```
node -v
```

Comprobar que tenemos npm instalado:
```
npm
```

Instalar todas las dependencias para el curso:
```
npm install
```

Para mayor comodidad, instalar de forma global *mocha*, *istanbul*
```
npm install -g mocha istanbul
```
NOTA: es posible que se necesiten permisos de Administrador para instalar de forma global (`sudo npm install -g ...`)

## Tecnologías

* `React` (0.13) - https://facebook.github.io/react/
* `Babel` para transpilación JSX -> JS - https://babeljs.io/
* `Webpack` para bundling - https://webpack.github.io/
* `statik` para servidor Web de desarrollo - https://github.com/hongymagic/statik
* `mori` para datos inmutables - http://swannodette.github.io/mori/
* `eventemitter3` para Dispatcher - https://github.com/primus/eventemitter3
* `page` para Router de cliente - https://visionmedia.github.io/page.js/
* `bluebird` como librería de Promesas (no necesario en realidad con Babel) - https://github.com/petkaantonov/bluebird


## Estructura del repositorio

*/ejercicios/* contiene esqueletos para ejercicios e infraestructura necesaria para ejecutarlos, así como plantillas HTML, estilos CSS, etc. Un directorio por cada tema.

*/soluciones/* contiene todos los ejercicios resueltos así como los ejemplos de código incluidos en las presentaciones. Un directorio por cada tema.

*/pdf* contiene las diapositivas en formato PDF, uno por tema.

*/keynote* contiene las diapositivas en formato original Keynote, uno por tema.




