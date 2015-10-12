//utils for React component tests
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils;


/** creates a mock component with specific className **/
function generateMockComponent(className = 'test'){
  return React.createClass({
    render: function(){
      return (<div className={ className }></div>);
    }
  });
}

/** renders a React component, passing it desired props.state value **/
function renderWithState(subjectClass, atomState = {}){
  return TestUtils.renderIntoDocument(React.createElement(subjectClass, { state: atomState }));
}

/** renders a React component, with specified props **/
function renderWithProps(subjectClass, props = {}){
  return TestUtils.renderIntoDocument(React.createElement(subjectClass, props));
}

/** finds ONE child component of class childClass
    NOTE: TestUtils will THROW if there are more than one
**/
function findChildComponent(domTree, childClass){
  return TestUtils.findRenderedComponentWithType(domTree, childClass);
}

/** finds an Array of child components of class childClass */
function findChildComponentArray(domTree, childClass){
  return TestUtils.scryRenderedComponentsWithType(domTree, childClass);
}

/** finds ONE child component with CSS class className **/
function findDOMNodeWithClass(domTree, className){
  return TestUtils.findRenderedDOMComponentWithClass(domTree, className);
}

/** finds an Array of child components with CSS class className **/
function findDOMArrayWithClass(domTree, className){
  return TestUtils.scryRenderedDOMComponentsWithClass(domTree, className);
}

/** finds ONE child component with tag tagName (p, img, ...) **/
function findDOMNodeWithTag(domTree, tagName){
  return TestUtils.findRenderedDOMComponentWithTag(domTree, tagName);
}

/** finds an Array of child components with tag tagName (p, img, ...) **/
function findDOMArrayWithTag(domTree, tagName){
  return TestUtils.scryRenderedDOMComponentsWithTag(domTree, tagName);
}

module.exports = {
  generateMockComponent,
  renderWithState,
  renderWithProps,
  findChildComponent,
  findChildComponentArray,
  findDOMNodeWithClass,
  findDOMArrayWithClass,
  findDOMNodeWithTag,
  findDOMArrayWithTag
}