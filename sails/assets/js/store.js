const Actions = require('./actions');
const Reflux = require('reflux');
var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var sailsIOClient = require('./dependencies/sails.io.js');
var socketIOClient = require('socket.io-client');
var io = sailsIOClient(socketIOClient)

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
    this.todos = this.todos.concat(evt.data);
    this.trigger(this.todos)
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

// io.socket.on('todo',(evt)=>{
//
// });
//
// /*
//   DATA ACCESS
//   on load, etc.
// */
//
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


// var updateTodo = callback =>{
  // io.socket.on('todo',function(evt){
  //   console.log('an event: ', evt);
  //   switch(evt.verb){
  //     case 'delete':
  //       console.log('delete');
  //       break;
  //     case 'created':
  //       console.log('update');
  //       this.todos = this.todos.concat(evt.data);
  //       thistrigger(this.todos);
  //       break;
  //   };
  // })
// }
//
// var notifyDelete = callback=>{
//
// }
//
// var getTodos = callback=>{
//   io.socket.get('/todo',function(body,JWR){
//     console.log("res from todo",body);
//     if(callback)
//       callback(body,JWR)
//   })
// }
// function getTodos(callback){
//   $.get('http://localhost:1337/todo',function(data,status,jqXHR){
//     //TODO: validate good data came from server
//     callback(data);
//   })
// }

// io.socket.on('todo',function(event){
//   console.log('an update occured on todo: ', event);
//   getTodos();
// })
