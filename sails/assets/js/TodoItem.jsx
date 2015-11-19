const React = require('react');
// var todoStore = require('./store');
var todoActions = require('./actions');

const FlatButton = require('material-ui/lib/flat-button')
//Import statements:
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

module.exports = React.createClass({
  handleDeleteTodo(){
    todoActions.deleteTodo(this.props.id)
  },
  render(){
    return(
      <Card>
        <CardHeader
          title = {this.props.content}
          >
          <FlatButton label="Done" />
          <FlatButton label="Delete" onClick={this.handleDeleteTodo}/>
        </CardHeader>
        <CardActions>

        </CardActions>
      </Card>
    )
  }
})
