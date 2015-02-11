var keyMirror = require('keymirror');

module.exports = keyMirror({
	TODO_INIT: null,

	TODO_CREATE: null,
	TODO_COMPLETE: null,
	TODO_DESTROY: null,
	TODO_DESTROY_COMPLETED: null,
	TODO_TOGGLE_COMPLETE_ALL: null,
	TODO_UNDO_COMPLETE: null,
	TODO_UPDATE_TEXT: null,
	
	TODO_FILTER_ALL: null,
	TODO_FILTER_ACTIVE: null,
	TODO_FILTER_COMPLETED: null,

	TODO_SAVE_NOW: null,
	TODO_IS_UNITITIALIZED: null,
	TODO_IS_SAVED: null,
	TODO_IS_UNSAVED: null
});