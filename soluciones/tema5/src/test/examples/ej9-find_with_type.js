//see utils/dom.js for shared jsdom configuration
var domutils = require('../utils/dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var should = require('should');

var Title = React.createClass({
  render: function(){
    return <h1 className='title'>{ this.props.message }</h1>;
  }
});

var Summary = React.createClass({
  render: function(){
    return <p className='summary'>{ this.props.text }</p>;
  }
})

var MyComponent = React.createClass({
  render: function(){
    return (
      <div>
        <Title message='Hello Testing World' />
        <Summary text='This is good' />
        <Summary text='Very good' />
      </div>
    );
  }
});

describe('React find-scry with component type', function(){
  var component;
  before(function(){
    component = TestUtils.renderIntoDocument(<MyComponent />);
  });

  it('Should render one Title component', function(){
    var title = TestUtils.findRenderedComponentWithType(component, Title);
    title.should.be.an.Object;
    title.props.message.should.equal('Hello Testing World');
  });

  it('Should render two Summary components', function(){
    var paragraphs = TestUtils.scryRenderedComponentsWithType(component, Summary);
    paragraphs.should.have.length(2);
    paragraphs[0].props.text.should.equal('This is good');
    paragraphs[1].props.text.should.equal('Very good');
  });
});