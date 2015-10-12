//see utils/dom.js for shared jsdom configuration
var domutils = require('../utils/dom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var should = require('should');

var MyComponent = React.createClass({
  render: function(){
    return (
      <div>
        <h1 className='title'>Hello world</h1>
        <p className='summary'>This is good</p>
        <p className='summary'>Very good</p>
      </div>
    );
  }
});

describe('React find-scry with CSS class', function(){
  var component;
  before(function(){
    component = TestUtils.renderIntoDocument(<MyComponent />);
  });

  it('Should render one title heading', function(){
    var title = TestUtils.findRenderedDOMComponentWithClass(component, 'title');
    title.should.be.an.Object;
    title.props.children.should.equal('Hello world');
  });

  it('Should render two summary paragraphs', function(){
    var paragraphs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'summary');
    paragraphs.should.have.length(2);
    paragraphs[0].props.children.should.equal('This is good');
    paragraphs[1].props.children.should.equal('Very good');
  });
});

