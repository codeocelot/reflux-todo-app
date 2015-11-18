var Actions = require('./actions');
var Reflux = require('reflux');
var i = 0;
module.exports = Reflux.createStore({
  listenables:[Actions],
  onSomeAction:function(){
    console.log('some action executed')
    console.log( `${++i}`)
  }
})


module.exports = function(Reflux,Actions){
  var i = 0;
  return Reflux.createStore({
    listenables:[Actions],
    onSomeAction:function(){
      console.log('some action executed')
      console.log( `${i}`)
    }
  })
}
