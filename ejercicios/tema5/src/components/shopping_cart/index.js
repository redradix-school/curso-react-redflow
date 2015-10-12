var React = require('react'),
    //Stores
    RootStore = require('../../stores/root'),
    //Componentes
    Catalog = require('./catalog'),
    Cart = require('./cart'),
    Checkout = require('./checkout'),
    ThankYou = require('./thank_you');

var ShoppingCart = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  getPageComponent: function(page){
    switch(page){
    case 'catalog':
      return <Catalog state={this.props.state} />;
    case 'cart':
      return <Cart state={this.props.state} />
    case 'checkout':
      return <Checkout state={this.props.state} />;
    case 'thank-you':
      return <ThankYou state={this.props.state} />;
    }
  },

  render: function(){
    var currentPage = RootStore.getPage(this.props.state);

    return (
      <div className="shopping-cart">
        { this.getPageComponent(currentPage) }
      </div>
    );
  }

});

module.exports = ShoppingCart;