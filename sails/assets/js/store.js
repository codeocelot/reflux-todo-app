const Actions = require('./actions');
const Reflux = require('reflux');
var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var sailsIOClient = require('./dependencies/sails.io.js');
var socketIOClient = require('socket.io-client');
var io = sailsIOClient(socketIOClient)

module.exports = Reflux.createStore({
  listenables:[Actions],
  onAddTodo(content){
    $.post('http://localhost:1337/todo',{content,status:'incomplete'},(data,status,jqXHR)=>{
    });
  },
  onUpdateList(){
    this.updateList();
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
