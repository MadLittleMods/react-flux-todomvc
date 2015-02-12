var React = require('react');
var cx = require('react/lib/cx');
var Router = require('react-router');
var { Link } = Router;

var TodoActions = require('../actions/TodoActions');
var TodoConstants = require('../constants/TodoConstants');

var Footer = React.createClass({

	propTypes: {
		allTodos: React.PropTypes.object.isRequired,
		activeTodos: React.PropTypes.object.isRequired,
		completedTodos: React.PropTypes.object.isRequired,
		filter: React.PropTypes.string.isRequired
	},

	render: function() {
		var filter = this.props.filter;
		var allTodos = this.props.allTodos;
		var total = allTodos.count();

		var activeTotal = this.props.activeTodos.count();
		var completedTotal = this.props.completedTodos.count();

		// Show nothing when there is nothing to filter/utility on
		if(total <= 0) {
			return null;
		}

		var clearCompletedButton;
		if(completedTotal > 0) {
			clearCompletedButton = (
				<button
					id="clear-completed"
					onClick={this._onClearCompletedClick}>
					Clear completed ({completedTotal})
				</button>
			);
		}

		return (
			<footer id="footer">
				<span id="todo-count">
					<strong>{activeTotal}</strong> { activeTotal > 1 ? 'items' : 'item'} left
				</span>
				<ul id="filters">
					<li>
						<Link 
							to="all"
							className={cx({
								'selected': filter === TodoConstants.TODO_FILTER_ALL
							})}
							onClick={this._onFilterItemClick.bind(null, TodoConstants.TODO_FILTER_ALL)}
						>
							
							All ({total})
						</Link>
					</li>
					<li>
						<Link 
							to="active"
							className={cx({
								'selected': filter === TodoConstants.TODO_FILTER_ACTIVE
							})}
							onClick={this._onFilterItemClick.bind(null, TodoConstants.TODO_FILTER_ACTIVE)}
						>
							
							Active ({activeTotal})
						</Link>
					</li>
					<li>
						<Link 
							to="completed"
							className={cx({
								'selected': filter === TodoConstants.TODO_FILTER_COMPLETED
							})}
							onClick={this._onFilterItemClick.bind(null, TodoConstants.TODO_FILTER_COMPLETED)}
						>
							
							Completed ({completedTotal})
						</Link>
					</li>
				</ul>
				{clearCompletedButton}
			</footer>
		);
	},

	_onFilterItemClick: function(filter, e) {
		TodoActions.filter(filter);
	},

	_onClearCompletedClick: function() {
		TodoActions.destroyCompleted();
	}

});

module.exports = Footer;