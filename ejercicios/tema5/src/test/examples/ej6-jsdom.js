var jsdom = require('jsdom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var should = require('should');

//our simple test component
var MyComponent = React.createClass({
  render: function(){
    return <div>Hello world!</div>;
  }
});

describe('React Render test', function(){
  before(function(){
    //setup jsdom
    var doc = jsdom.jsdom('<html><head></head><body></body></html>');
    var win = doc.defaultView;
    global.document = doc;
    global.window = win;
  });

  it('Should render', function(){
    var component = TestUtils.renderIntoDocument(<MyComponent />);
    component.should.be.an.Object;
  });
});



