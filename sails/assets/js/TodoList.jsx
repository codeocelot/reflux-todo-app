var React = require('react');
var TodoItem = require('./TodoItem');
var actions = require('./actions');
var sailsIOClient = require('./dependencies/sails.io.js');
var socketIOClient = require('socket.io-client');
var io = sailsIOClient(socketIOClient)


module.exports = React.createClass({
  getInitialState(){
    return{

    }
  },
  componentDidMount(){
    io.socket.get('/todo',(body,jwr)=>{
      this.setState({
        todos:body
      })
    })
    io.socket.on('todo',(evt)=>{
      switch(evt.verb){
        case 'destroyed':
          actions.netDestroy(evt);
          break;
        case 'created':
          actions.netCreate(evt);
          break;
      };
    });
  },
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
