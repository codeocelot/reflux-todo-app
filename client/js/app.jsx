(function(){
  console.log('in app.js')
    const React = window.React = require('react')
    const Reflux = window.Reflux = require('reflux')
    
    var Actions = require('./actions')
    var Component = require('./firstComponent')

    React.render(
      <div>
        <h1>Hi world</h1>
        <Component/>
      </div>
      ,
        document.getElementById('react-app'))
})();
