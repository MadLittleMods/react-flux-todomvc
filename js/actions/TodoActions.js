var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {
	init: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_INIT,
		});
	},

	create: function(text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},

	updateText: function(id, text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
	},

	toggleComplete: function(todo) {
		AppDispatcher.dispatch({
			actionType: todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE,
			id: todo.get('id')
		});
	},

	toggleCompleteAll: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
		});
	},

	filter: function(filterConstant) {
		AppDispatcher.dispatch({
			actionType: filterConstant,
		});
	},

	destroy: function(id) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},

	destroyCompleted: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED
		});
	},

	saveNow: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_SAVE_NOW
		});
	}
};

module.exports = TodoActions;