var React = require('react');

var Item = React.createClass({
  render: function(){
    return (<div>Soy uno más</div>);
  }
});

var Lista = React.createClass({
  render: function(){
    var items = [];
    for(var i=0; i < 100; i++){
      items.push(<Item key={i} />);
    }
    return (
      <div>
        { items }
      </div>
    );
  }
});

module.exports = Lista;