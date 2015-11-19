(function(){
  console.log('in app.js')
    const React = window.React = require('react')
    const Reflux = window.Reflux = require('reflux')

    var Actions = require('./actions')
    var TodoMain = require('./TodoMain')

    React.render(
      <TodoMain/>
      ,
      document.getElementById('react-app'))
})();
