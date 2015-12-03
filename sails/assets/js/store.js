const Actions = require('./actions');
const Reflux = require('reflux');
var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var sailsIOClient = require('./dependencies/sails.io.js');
var socketIOClient = require('socket.io-client');
var io = sailsIOClient(socketIOClient);

module.exports = Reflux.createStore({
  listenables:[Actions],
  onAddTodo(content){
    $.post('http://localhost:1337/todo',{content,status:'incomplete'},(data,status,jqXHR)=>{
    });
  },
  onUpdateList(){
    this.updateList();
  },
  onUpdateTodo(id,status){
    var t = _.findWhere(this.todos,{id});
    t.status = (t.status ==='incomplete') ? 'done' : 'incomplete';
    t.isComplete = (t.status === 'done');
    console.log('in update todo')
    putToNet(t);
    this.trigger(this.todos);
  },
  onDeleteTodo(id){
    // removes from own store
    this.todos = _.without(
      this.todos
      ,_.findWhere(
        this.todos
        ,{id}
      )
    );
    deleteToNet(id,()=>{/* completed sending  here*/})
    this.trigger(this.todos);
  },
  updateList(){
    getTodos((err,data,jwt)=>{
      if(err)throw new Error(err);
      this.todos = data;
      this.trigger(this.todos);
    })
  },
  onNetCreate(evt){
    if(!_.findWhere(this.todos,{id:evt.data.id})){
      this.todos = this.todos.concat(evt.data);
    }
    this.trigger(this.todos);
  },
  onNetUpdate(evt){
    var id = evt.data.id
    evt.data.isComplete = true;
    var index = _.findIndex(this.todos,{id});
    this.todos[index] = evt.data;
    this.trigger(this.todos)
    // var t = _.findWhere(this.todos,{id});
    // t = evt.data
    // this.trigger(this.todos);
  },
  onNetDestroy(evt){
    var id = evt.id;
    this.todos = _.without(
      this.todos
      ,_.findWhere(
        this.todos
        ,{id}
      )
    );
    this.trigger(this.todos);
  },
  onUpdateStatus(evt,status){
  }
})
function rmTodo(id){
  $.ajax(`http://localhost:1337/todo/${id}`
    ,{
      method:"DELETE",
      success:function(){
        // console.log('successful deleting');
      },
      error:function(jqXHR,status,error){
        console.error(error);
      }
    }
  )
}

/*
  SOCKET EVENTS
*/

var getTodos = callback=>{
  io.socket.get('/todo',function(body,JWR){
    console.log("res from todo",body);
    if(callback)
      callback(null,body,JWR)
  })
}
var deleteToNet = (id,callback) =>{
  io.socket.delete(`/todo/${id}`,function(res){
    // todo
    callback(null,res);
  })
}
var putToNet = (todo,callback) =>{
  console.log('puttinging: ', todo)
  io.socket.put(`/todo/${todo.id}`,todo,(res)=>{if(callback)callback(null,res)})
}
