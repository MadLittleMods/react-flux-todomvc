var React = require('react');

var TodoTextInput = require('./TodoTextInput.react');

var TodoActions = require('../actions/TodoActions');
var TodoConstants = require('../constants/TodoConstants');

var Header = React.createClass({
	propTypes: {
		saveState: React.PropTypes.string.isRequired
	},

	render: function() {
		var saveState = this.props.saveState;

		var saveStatusMessage;
		switch(saveState) {
			case TodoConstants.TODO_IS_SAVED: 
				saveStatusMessage = 'Saved';
				break;
			case TodoConstants.TODO_IS_UNSAVED:
				saveStatusMessage = 'Unsaved';
				break;
			// We put the explicit case below `default` just because it is nice to remember what is going on
			default:
			case TodoConstants.TODO_IS_UNITITIALIZED:
				saveStatusMessage = 'Not initialized yet';
				break;
		}

		return (
			<header id="header">
				<h1>todos</h1>
				<section className="status-bar">
					<span className="save-status">
						{saveStatusMessage}
					</span>
				</section>
				<TodoTextInput
					id="new-todo"
					placeholder="What needs to be done?"
					onSave={this._onSave}
				/>
			</header>
		);
	},

	_onSave: function(text) {
		TodoActions.create(text);
	}
});

module.exports = Header;