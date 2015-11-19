const React = require('react');
// var todoStore = require('./store');
var todoActions = require('./actions');

const FlatButton = require('material-ui/lib/flat-button')

module.exports = React.createClass({
  handleDeleteTodo(){
    todoActions.deleteTodo(this.props.id)
  },
  render(){
    return(
      <div>
      <div className="list-group-item" style={{position:"relative"}}>
          <div className="row-action-primary">
            <i className="mdi-file-folder"></i>
          </div>
          <div className="row-content">
            <div className="close-button-wrap pull-right">
              <FlatButton label="X" type="button" onClick={this.handleDeleteTodo} className='pull-right'>
                <i className="fa fa-times"/>
              </FlatButton>
            </div>
            <p className="list-group-item-text">
              {this.props.content}
            </p>
          </div>
        </div>
        <div className="list-group-separator"></div>
      </div>
    )
  }
})
