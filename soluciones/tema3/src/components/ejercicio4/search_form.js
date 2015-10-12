var React = require('react'),
    _ = require('mori'),
    SeasonOption = require('./season_option');

//Componente con los controles de formulario
var SearchForm = React.createClass({
  propTypes: {
    onQueryChange: React.PropTypes.func.isRequired,
    families: React.PropTypes.array.isRequired
  },
  //estado inicial
  getInitialState: function() {
    return {
      name: '',
      family: '',
      aliveOnly: false,
      seasons: _.set([]),
      allSeasons: [1,2,3,4,5]
    };
  },
  //manejador onChange en el textbox nombre
  onNameChange: function(e){
    this.setState({
      name: e.target.value
    });
    this.notifyChange();
  },
  //manejador onChange en el desplegable family
  onFamilyChange: function(e){
    this.setState({
      family: e.target.value
    });
    this.notifyChange();
  },
  //manejador onChange en el checkbox alive
  onAliveChange: function(e){
    this.setState({
      aliveOnly: e.target.checked
    });
    this.notifyChange();
  },
  //manejador onChange para cambios en los checkbox season
  onSeasonChange: function(e){
    var currentSeasons = this.state.seasons;
    if(e.checked){
      this.setState({
        seasons: _.conj(currentSeasons, e.season)
      });
    }
    else {
      this.setState({
        seasons: _.disj(currentSeasons, e.season)
      });
    }
    this.notifyChange();
  },
  //genera los parámetros de búsqueda para el componente padre
  notifyChange: function(){
    var self = this;
    setTimeout(function(){
      var eventData = {
        name: self.state.name,
        family: self.state.family,
        aliveOnly: self.state.aliveOnly,
        seasons: _.intoArray(self.state.seasons)
      }
      self.props.onQueryChange(eventData);
    }, 150);
  },
  renderFamilyOptions: function(families){
    return this.props.families.map(function(f){
      return <option key={f} value={f}>{f}</option>;
    });
  },
  renderSeasonOptions: function(allSeasons, selectedSeasons){
    var self = this;
    return this.props.seasons.map(function(s){
      return (<SeasonOption key={s} season={s} checked={_.hasKey(selectedSeasons, s)} onSeasonChange={self.onSeasonChange} />);
    });
  },
  render: function(){
    var familyOptions = this.renderFamilyOptions();
    var seasonOptions = this.renderSeasonOptions(this.props.seasons, this.state.seasons);
    return (
      <div className="search-form">
        <form>
          <div className="row">
            <div className="col one-half">
              <label forHtml="character">Actor / personaje</label>
              <input type="text" name="character" value={this.state.name} onChange={this.onNameChange} />
            </div>
            <div className="col one-half">
              <label forHtml="family">Familia</label>
              <select name="family" value={this.state.family} onChange={this.onFamilyChange} >
                <option value="">Todas</option>
                { familyOptions }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col one-half">
              <label forHtml="alive">Sólo personajes vivos</label>
              <input type="checkbox" name="alive" checked={this.state.aliveOnly} onChange={this.onAliveChange}  />
            </div>
            <div className="col one-half">
              <fieldset>
                <legend>Aparece en temporada</legend>
                { seasonOptions }
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = SearchForm;