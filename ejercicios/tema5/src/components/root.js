var React = require('react'),
    atom = require('../lib/atom_state');

var ShoppingCart = require('./shopping_cart/');

var RootComponent = React.createClass({
  componentDidMount: function() {
    atom.addChangeListener(this._onAtomChange);
  },
  _onAtomChange: function(){
    this.forceUpdate();
  },
  render: function(){
    var state = atom.getState();
    return (<ShoppingCart state={state} />);
  }
});

module.exports = RootComponent;