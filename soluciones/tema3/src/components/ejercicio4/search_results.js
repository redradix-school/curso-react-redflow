var React = require('react');


//componente que muestra la fila de "no hay resultados"
var EmptyResult = React.createClass({
  render: function(){
    return (
      <tr>
        <td colSpan='4' className='center'>No hay personajes que coincidan con los criterios.</td>
      </tr>
    );
  }
});

//componente de una fila de resultados
var ResultRow = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  render: function(){
    var item = this.props.item;
    return (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.actor}</td>
        <td className="center">{item.seasons.join(", ")}</td>
        <td className="center">{item.alive ? "Sí" : "No" }</td>
      </tr>
    );
  }
});

//componente que muestra los resultados de búsqueda
var SearchResults = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },
  renderRows: function(items){
    return items.map(function(item){
      return (<ResultRow key={item.name} item={item} />);
    })
  },
  renderNoResults: function(){
    return (<EmptyResult />);
  },
  render: function(){
    var rows = this.renderRows(this.props.items);
    return (
      <div className="search-results">
        <div className="search-results-summary">
          Encontrados <span className="search-results-total">{ rows.length }</span> personajes
        </div>
        <table>
          <thead>
            <tr>
              <th>Personaje</th>
              <th>Actor</th>
              <th className="center">Temp</th>
              <th className="center">Vivo</th>
            </tr>
          </thead>
          <tbody>
            { rows }
            { rows.length === 0 && this.renderNoResults() }
          </tbody>
        </table>

      </div>
    );
  }
});
//exportamos el componente padre
module.exports = SearchResults;