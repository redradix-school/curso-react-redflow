var React = require('react'),
    SearchForm = require('./search_form'),
    SearchResults = require('./search_results'),
    _ = require('mori'),
    data = require('../../data/got');


//Extrae las diferentes familias de la lista de personajes
function getFamilies(characterList){
  return _.intoArray(_.reduce(function(acc, character){
    return _.hasKey(acc, character.family) ? acc : _.conj(acc, character.family);
  }, _.set([]), characterList));
}

//Extrae las diferentes temporadas de la lista de personajes
function getSeasons(characterList){
  return _.intoArray(_.reduce(function(acc, character){
    return _.into(acc, character.seasons);
  }, _.set([]), characterList));
}

//Función auxiliar para devolver los
//registros que conciden con los parámetros que envía el SearchForm
// params {
//    name: "xxx",
//    family: "familyName",
//    aliveOnly: true/false,
//    seasons: [1,2,..]
// }
function searchData(params){
  var nameRegExp = new RegExp(params.name, 'i');
  return _.filter(function(item){
    var match = ( nameRegExp.test(item.name) || nameRegExp.test(item.actor))
        && (!params.family || item.family === params.family)
        && (!params.aliveOnly || item.alive)
        && (_.isSuperset(_.set(item.seasons), _.set(params.seasons)));

    return match;
  }, data.characters);
}



//Componente para el encabezado
var Header = React.createClass({
  render: function(){
    return (
      <div className="search-title">
        <div className="row">
          <h1>Buscador Juego de Tronos</h1>
        </div>
      </div>
    );
  }
});


//Componente padre
var SearchEngine = React.createClass({
  getInitialState: function() {
    return {
      searchResults: data.characters,
      families: getFamilies(data.characters),
      seasons: getSeasons(data.characters)
    };
  },
  search: function(params){
    this.setState({
      searchResults: _.intoArray(searchData(params))
    });
  },
  render: function(){
    return (
      <div className="search-engine">
        <Header />
        <SearchForm
          onQueryChange={ this.search }
          families={ this.state.families }
          seasons={ this.state.seasons } />
        <SearchResults items={ this.state.searchResults } />
      </div>
    )
  }
});

module.exports = SearchEngine;