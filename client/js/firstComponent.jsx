var React = require('react')
var firstActions = require('./actions')
var firstStore = require('./store')

module.exports = React.createClass({
  handleClick(){
    console.log('clicked')
    firstActions.someAction('passed from first component')
  },
  render(){
    return (<div>
      <h1>A component</h1>
      <button onClick={this.handleClick}>Click Me</button>
      </div>)
  }
})
