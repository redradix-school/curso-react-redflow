var React = require('react');


var CicloVida = React.createClass({
  getDefaultProps: function() {
    console.log('Get default props');
    return {
      init: 0
    };
  },
  getInitialState: function(){
    console.log('Get initial state');
    return {
      count: this.props.init
    };
  },
  componentWillMount: function(){
    console.log('Component will mount');
  },
  componentDidMount: function(){
    console.log('Component did mount');
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('Component will receive props', nextProps);
  },
  shouldComponentUpdate: function(nextProps, nextState){
    console.log('Should component update', nextProps, nextState);
    return true;
  },
  componentWillUpdate: function(nextProps, nextState){
    console.log('Componente will update');
  },
  componentDidUpdate: function(prevProps, prevState) {
    console.log('Componente did update', prevProps, prevState);
  },
  componentWillUnmount: function() {
    console.log('Componente will unmount');
  },
  onButtonClick: function(e){
    console.log('Evento: onButtonClick');
    this.setState({ count: this.state.count+1 });
  },
  render: function(){
    console.log('RENDER');
    return (
      <div>
        Clicks: {this.state.count} <br />
        <button onClick={this.onButtonClick}>Click me!</button>
        <p>Abre la consola Javascript!!</p>
      </div>
    );
  }
});

module.exports = CicloVida;