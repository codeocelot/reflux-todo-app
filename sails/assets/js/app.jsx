(function(){
  console.log('in app.js')
    const React = window.React = require('react')
    const Reflux = window.Reflux = require('reflux')
    // const SocketIO = require('../bower_components/sails.io.js/sails.io.js')
    var Actions = require('./actions')
    var TodoMain = require('./TodoMain')

    React.render(
      <TodoMain/>
      ,
      document.getElementById('react-app'))
})();
