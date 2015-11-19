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
    console.log('asked for updated list')
    todoActions.updateList();
  },
  handleClick(){
    console.log('clicked')
    todoActions.someAction('passed from first component')
  },
  handleNewTodo(evt){
    console.log("new todo: ", this.refs.todoinput.value)
    todoActions.addTodo(this.refs.todoinput.value);
    this.refs.todoinput.value = '';
  },
  render(){
    return (<div>
      <h1>A component</h1>
      <button onClick={this.handleClick}>Click Me</button>
      <input type="text" name="content" placeholder="new todo content" ref="todoinput"></input>
      <button type="button" onClick={this.handleNewTodo}>Create Todo</button>
      <button type="button" onClick={this.setTodos}>Refresh</button>
      <TodoList todos={this.state.todos}>
        {this.state}
      </TodoList>
      </div>)
  }
})
