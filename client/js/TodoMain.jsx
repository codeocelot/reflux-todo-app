var React = require('react');
var todoActions = require('./actions');
var todoStore = require('./store');
var TodoList = require('./TodoList');

module.exports = React.createClass({
  mixins:[Reflux.connect(todoStore,'todos')],
  getInitialState(){
    return {todos:[]}
  },
  setTodos(){
    this.setState({
      todos:todoActions.updateList()
    });
  },
  componentDidMount(){
    todoActions.updateList();
  },
  handleClick(){
    todoActions.someAction('passed from first component')
  },
  handleNewTodo(evt){
    todoActions.addTodo(this.refs.todoinput.value);
    this.refs.todoinput.value = '';
  },
  render(){
    return (<div className="container">
    {/* <h1>A component</h1>*/}
    <div className="row">
      <div className="panel panel-default col-sm-12 todo-main">
        <div className="panel-body">
          <h3>Todo List</h3>
          <input type="text" name="content" placeholder="new todo content" ref="todoinput"></input>
          <button type="button" onClick={this.handleNewTodo}>Create Todo</button>
          <button type="button" onClick={this.setTodos}>Refresh</button>
        </div>
      </div>


      <TodoList todos={this.state.todos}>
        {this.state}
      </TodoList>
    </div>
  </div>)
}
})
