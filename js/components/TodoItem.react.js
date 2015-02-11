var React = require('react');
var cx = require('react/lib/cx');

var TodoTextInput = require('./TodoTextInput.react');

var TodoActions = require('../actions/TodoActions');

var TodoItem = React.createClass({
	propTypes: {
		todo: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			isEditing: false
		};
	},

	render: function() {
		var todo = this.props.todo;

		var input;
		if(this.state.isEditing) {
			input = (
				<TodoTextInput
					className="edit"
					value={todo.get('text')}
					onSave={this._onSave}
				/>
			);
		}

		return (
			<li 
			className={cx({
				'completed': todo.get('complete'),
				'editing': this.state.isEditing
			})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.get('complete') ? 'checked' : ''}
						onChange={this._onToggleComplete}
					/>
					<label onDoubleClick={this._onDoubleClick}>
						{todo.get('text')}
					</label>
					<button className="destroy" onClick={this._onDestroyClick} />
				</div>
				{input}
			</li>
		);
	},

	_onToggleComplete: function() {
		TodoActions.toggleComplete(this.props.todo);
	},

	_onDoubleClick: function() {
		this.setState({
			isEditing: true
		});
	},

	_onSave: function(text) {
		TodoActions.updateText(this.props.todo.get('id'), text);
		this.setState({
			isEditing: false
		});
	},

	_onDestroyClick: function() {
		TodoActions.destroy(this.props.todo.get('id'));
	}
});

module.exports = TodoItem;