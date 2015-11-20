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

const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');

const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');

var rightIconMenu = React.createClass({
  render(){
    <IconMenu iconButtonElement={
        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>
      }>
      <MenuItem primaryText="Placeholder for now"/>
      <MenuItem primaryText="2nd for now"/>
    </IconMenu>
  }
})

module.exports = React.createClass({
  mixins:[LinkedStateMixin,Reflux.connect(todoStore,'todos')],
  getInitialState(){
    return {
      // status:true
    }
  },
  handleClick(){console.log('click occured')},
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
      <ListItem primaryText={this.props.content} rightIconButton={
          <IconMenu iconButtonElement={
              <IconButton onClick={this.handleDeleteTodo} iconClassName="fa fa-times" tooltip="GitHub"/>
            }
          >
            <MenuItem primaryText="Placeholder for now"/>
            <MenuItem primaryText="2nd for now"/>
          </IconMenu>}
          rightToggle={
            <Toggle name="status" onToggle={this.handleStatusChange}  ref="statusToggle" toggled={this.props.isComplete} style={{right:"60px"}}/>
          }
      />
    )
  }
})


// <Card>
//   <CardHeader
//     title = {this.props.content}>
//
//     <FlatButton label="Delete" onClick={this.handleDeleteTodo} style={{width:"30%",float:"right"}}/>
//   </CardHeader>
//   <CardActions>
//
//   </CardActions>
// </Card>
