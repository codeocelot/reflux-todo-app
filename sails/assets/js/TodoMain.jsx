var React = require('react');
const LinkedStateMixin = require('react-addons-linked-state-mixin')

var todoActions = require('./actions');
var todoStore = require('./store');
var TodoList = require('./TodoList');

var TextField = require('material-ui/lib/text-field')
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
const FlatButton = require('material-ui/lib/flat-button');
const AppBar = require('material-ui/lib/app-bar');
const RaisedButton = require('material-ui/lib/raised-button');
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const PurpleTheme = require('./theme')
const ThemeManager = require('material-ui/lib/styles/theme-manager');

module.exports = React.createClass({
  mixins:[Reflux.connect(todoStore,'todos'),LinkedStateMixin],
  //the key passed through context must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(PurpleTheme),
    };
  },
  getInitialState(){
    return {
      todos:[],
    }
  },
  setTodos(){
    this.setState({
      todos:todoActions.updateList()
    });
  },
  componentDidMount(){
    todoActions.updateList();
  },
  handleNewTodo(evt){
    todoActions.addTodo(this.state.todoinput);
    this.setState({
      todoinput:''
    })
  },
  render(){
    return (
      <div>
        <AppBar title="What should I do?" ></AppBar>
        <Card>
          <CardHeader>
            <TextField placeholder="New Todo" valueLink={this.linkState('todoinput')}/>
              <FlatButton label="Add Todo Item" onClick={this.handleNewTodo}/>
          </CardHeader>
          <CardActions>
          </CardActions>
        </Card>
        <TodoList todos={this.state.todos}>
          {this.state}
        </TodoList>
      </div>
    )
  }
})
