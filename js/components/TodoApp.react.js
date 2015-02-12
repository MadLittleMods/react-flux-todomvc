var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');

var React = require('react');
var TodoStore = require('../stores/TodoStore');

var TodoConstants = require('../constants/TodoConstants');
var TodoActions = require('../actions/TodoActions');

function getTodoState() {
	return  {
		saveState: TodoStore.getSaveState(),
		todos: TodoStore.get(),
		allTodos: TodoStore.getAll(),
		activeTodos: TodoStore.getAllActive(),
		completedTodos: TodoStore.getAllCompleted(),
		filter: TodoStore.getFilter(),
		areAllComplete: TodoStore.areAllComplete()
	}
}

var TodoApp = React.createClass({
	propTypes: {
		filter: React.PropTypes.string
	},

	getInitialState: function() {
		return getTodoState();
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);


		// Initialize the application
		TodoActions.init();
		// Set the initial filter for the store
		TodoActions.filter(this.props.filter || TodoConstants.TODO_FILTER_ALL);
	},

	componentWillUnmount: function() {
		TodoStore.removeChangeListener(this._onChange);
		
		// Before we leave save!
		TodoActions.saveNow();
	},

	render: function() {

		var filter = this.state.filter;

		return (
			<div>
				<Header
					saveState={this.state.saveState}
				/>
				<MainSection
					todos={this.state.todos}
					areAllComplete={this.state.areAllComplete}
				/>
				<Footer
					allTodos={this.state.allTodos}
					activeTodos={this.state.activeTodos}
					completedTodos={this.state.completedTodos}
					filter={filter}
				/>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getTodoState());
	}
});

module.exports = TodoApp;