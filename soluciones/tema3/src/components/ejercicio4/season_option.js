var React = require('react');

//Componente para cada checkbox de temporada
var SeasonOption = React.createClass({
  propTypes: {
    season: React.PropTypes.number.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onSeasonChange: React.PropTypes.func.isRequired
  },
  //manejador change del checkbox
  onChange: function(e){
    //usamos el evento de React para
    //generar nuestro propio evento a medida
    var seasonChangeEvent = {
      season: this.props.season,
      checked: e.target.checked
    };
    this.props.onSeasonChange(seasonChangeEvent);
  },
  render: function(){
    return (
      <div key={this.props.season} className="season-option">
        {this.props.season}
        <input type="checkbox" onChange={this.onChange} checked={ this.props.checked } />
      </div>
    );
  }
});

module.exports = SeasonOption;