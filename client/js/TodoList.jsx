var React = require('react');
var TodoItem = require('./TodoItem')

module.exports = React.createClass({
  render(){
    var todos = this.props.todos.map(
      todo=>{
        todo.key=todo.id
        return (
          <TodoItem {...todo} ></TodoItem>
        )
      }
    )
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="list-group">
            {todos}
          </div>
        </div>
      </div>
    )
  }
})
