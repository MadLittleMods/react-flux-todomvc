var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var Immutable = require('immutable');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Debounce = require('../lib/debounce.js');


var CHANGE_EVENT = 'change';

// Collection of todo items
var _todos = Immutable.OrderedMap({});

// Current filter on this store
var _filter = TodoConstants.TODO_FILTER_ALL;

var _saveState = TodoConstants.TODO_IS_UNITITIALIZED;

var debounceInstance = new Debounce();


var TodoStore = assign({}, EventEmitter.prototype, {
	areAllComplete: function() {
		if(_todos) {
			return _todos.every(function(todo) {
				if(todo.get('complete')) {
					return true;
				}

				return false;
			});
		}
		else {
			return false;
		}
	},

	get: function() {
		if(_filter === TodoConstants.TODO_FILTER_ACTIVE) {
			return this.getAllActive();
		}
		else if(_filter === TodoConstants.TODO_FILTER_COMPLETED) {
			return this.getAllCompleted();
		}

		return this.getAll();
	},

	// Get the entire collection of ToDos
	getAll: function() {
		return _todos;
	},

	getAllActive: function() {
		var activeTodos = Immutable.OrderedMap({});
		_todos.forEach(function(todo) {
			if(!todo.get('complete')) {
				activeTodos = activeTodos.set(todo.get('id'), todo);
			}
		});

		return activeTodos;
	},

	getAllCompleted: function() {
		var completedTodos = Immutable.OrderedMap({});
		_todos.forEach(function(todo) {
			if(todo.get('complete')) {
				completedTodos = completedTodos.set(todo.get('id'), todo);
			}
		});

		return completedTodos;
	},

	getSaveState: function() {
		return _saveState;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(action) {
		var text;

		switch(action.actionType) {
			case TodoConstants.TODO_INIT:
				_todos = _todos.mergeDeep(JSON.parse(window.localStorage.getItem('todos')) || {});
				// Loaded from disk so we are all saved up
				_saveState = TodoConstants.TODO_IS_SAVED;
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_SAVE_NOW:
				save();
				break;

			case TodoConstants.TODO_CREATE:
				text = action.text.trim();
				if(text.length) {
					create(text);
					TodoStore.emitChange();
				}
				break;

			case TodoConstants.TODO_DESTROY:
				destroy(action.id);
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_UPDATE_TEXT:
				var text = action.text.trim();
				if(text.length) {
					update(action.id, { text: text });
					TodoStore.emitChange();
				}
				break;

			case TodoConstants.TODO_COMPLETE:
				update(action.id, { complete: true });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_UNDO_COMPLETE:
				update(action.id, { complete: false });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
				updateAll({ complete: TodoStore.areAllComplete() ? false : true });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_DESTROY_COMPLETED:
				destroyCompleted();
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_FILTER_ALL:
			case TodoConstants.TODO_FILTER_ACTIVE:
			case TodoConstants.TODO_FILTER_COMPLETED:
				_filter = action.actionType;
				TodoStore.emitChange();
				break;

			default:
      			// no op
		}

		// No errors. Needed by promise in Dispatcher.
		return true;
	})
});




function debouncedSave() {
	// Mark as dirty
	var prevSaveState = _saveState;
	_saveState = TodoConstants.TODO_IS_UNSAVED;
	if(prevSaveState !== _saveState) {
		TodoStore.emitChange();
	}

	debounceInstance.go(function() {
		save();
	}, 1000);
}

function save() {
	window.localStorage.setItem('todos', JSON.stringify(_todos));
	_saveState = TodoConstants.TODO_IS_SAVED;
	TodoStore.emitChange();
}

// Create a ToDo item
function create(text) {
	// Using the current timestamp in place of a real id.
	var id = String(Date.now());
	_todos = _todos.set(id, Immutable.Map({
		id: id,
		complete: false,
		text: text
	}));

	debouncedSave();
}

// Update a ToDo item
function update(id, updates) {
	var todo = _todos.get(id);
	if(todo) {
		_todos = _todos.set(id, todo.merge(updates));

		debouncedSave();
	}
}

// Update all of the ToDo items
// For example: Use to mark all todos as comlpeted
function updateAll(updates) {
	_todos.forEach(function(todo) {
		update(todo.get('id'), updates);
	});
}

// Delete the ToDo item
function destroy(id) {
	_todos = _todos.delete(id);

	debouncedSave();
}

// Destroys any ToDos marked as "complete"
function destroyCompleted() {
	_todos.forEach(function(todo) {
		if(todo.get('complete')) {
			destroy(todo.get('id'));
		}
	});
}





module.exports = TodoStore;