var React = require('react');

var TodoItem = require('./TodoItem.react');

var TodoActions = require('../actions/TodoActions');

var MainSection = React.createClass({
	propTypes: {
		todos: React.PropTypes.object.isRequired,
		areAllComplete: React.PropTypes.bool.isRequired
	},

	render: function() {
		var todos = this.props.todos;

		return (
			<section id="main">
				<input
					id="toggle-all"
					type="checkbox"
					checked={this.props.areAllComplete ? 'checked' : ''}
					onChange={this._onToggleCompleteAll}
				/>
       			<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					{todos.map(function(todo) {
						return (<TodoItem key={todo.get('id')} todo={todo} />);
					}).toArray()}
				</ul>
			</section>
		);
	},

	_onToggleCompleteAll: function() {
		TodoActions.toggleCompleteAll();
	}
});

module.exports = MainSection;