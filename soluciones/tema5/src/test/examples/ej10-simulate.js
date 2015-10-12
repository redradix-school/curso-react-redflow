//see utils/dom.js for shared jsdom configuration
var domutils = require('../utils/dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var should = require('should');

var MyComponent = React.createClass({
  getInitialState: function() {
    return {
      clicks: 0
    };
  },
  onClick: function(e){
    this.setState({ clicks: this.state.clicks+1 });
  },
  render: function(){
    return (
      <div>
        <p>You have clicked { this.state.clicks } times</p>
        <button onClick={this.onClick}>Click!</button>
      </div>
    );
  }
});

describe('React Simulate', function(){
  var component;
  before(function(){
    component = TestUtils.renderIntoDocument(<MyComponent />);
  });

  it('Should render 0 clicks on first mount', function(){
    //we can assert on the component state
    component.state.clicks.should.equal(0);
    //and also on the rendered output
    var paragraph = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    //'You have clicked', 0, ' times'
    paragraph.props.children.should.have.length(3);
    //Second is our initial value
    paragraph.props.children[1].should.equal(0);

  });

  it('Should increment click count when button is clicked', function(){
    var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
    //we need the DOM node, not the component
    var buttonNode = React.findDOMNode(button);
    //simulate click
    TestUtils.Simulate.click(buttonNode);
    //assert on new state on the parent component
    component.state.clicks.should.equal(1);
  });
});