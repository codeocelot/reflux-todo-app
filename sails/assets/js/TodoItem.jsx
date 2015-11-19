const React = require('react');
const Reflux = require('reflux');
var todoStore = require('./store');
var todoActions = require('./actions');
const LinkedStateMixin = require('react-addons-linked-state-mixin')

const FlatButton = require('material-ui/lib/flat-button')
//Import statements:
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const Toggle = require('material-ui/lib/toggle');
module.exports = React.createClass({
  mixins:[LinkedStateMixin,Reflux.connect(todoStore,'todos')],
  getInitialState(){
    return {
      // status:true
    }
  },
  handleDeleteTodo(){
    todoActions.deleteTodo(this.props.id)
  },
  handleStatusChange(evt,toggled){
    // console.log('handle status change',evt,checked,this.props.id)
    console.log("status change triggered")
    todoActions.updateTodo(this.props.id,toggled)
    // todoActions.deleteTodo(this.props.id)
  },
  render(){
    return(
      <Card>
        <CardHeader
          title = {this.props.content}>

        </CardHeader>
        <CardActions>
          <Toggle name="status" label="Done?" onToggle={this.handleStatusChange}  ref="statusToggle" toggled={this.props.isComplete} />
          <FlatButton label="Delete" onClick={this.handleDeleteTodo}/>
        </CardActions>
      </Card>
    )
  }
})
