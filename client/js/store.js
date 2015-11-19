var Actions = require('./actions');
var Reflux = require('reflux');
var $ = window.jQuery = require('jquery');
var _ = require('underscore')
module.exports = Reflux.createStore({
  listenables:[Actions],
  onSomeAction(){
    console.log('some action executed')
    console.log( `${++i}`)
  },
  onAddTodo(content){
    //do somethnig
    $.post('http://localhost:1337/todo',{content,status:'incomplete'})
    this.updateList();
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
    // remove from db
    rmTodo(id);
    this.trigger(this.todos);
  },
  updateList(){
    getTodos((data)=>{
      this.todos = data;
      this.trigger(this.todos);
    })
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

function getTodos(callback){
  $.get('http://localhost:1337/todo',function(data,status,jqXHR){
    //TODO: validate good data came from server
    callback(data);
  })
}
