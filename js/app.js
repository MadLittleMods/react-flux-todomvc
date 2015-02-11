var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, NotFoundRoute, RouteHandler } = Router;

var TodoApp = require('./components/TodoApp.react');

var TodoConstants = require('./constants/TodoConstants');


/* */

function makeTodoAppWithFilter(filter) {
	return React.createClass({
		render: function() {
			return <TodoApp filter={filter} />
		}
	});
}

var routes = (
	<Route handler={RouteHandler} path="/random/react-flux-todo-list-demo-project/" ignoreScrollBehavior>
		<DefaultRoute handler={TodoApp} />
		<NotFoundRoute handler={TodoApp} />
		
		<Route name="all" handler={makeTodoAppWithFilter(TodoConstants.TODO_FILTER_ALL)} />
		<Route name="active" handler={makeTodoAppWithFilter(TodoConstants.TODO_FILTER_ACTIVE)} />
		<Route name="completed" handler={makeTodoAppWithFilter(TodoConstants.TODO_FILTER_COMPLETED)} />
	</Route>
);

Router.create({
	routes: routes,
	location: Router.HistoryLocation
}).run(function (Handler, state) {
	React.render(<Handler />, document.getElementById('todoapp'));
});
/* */


/* * /
var routes = (
	<Route path="/random/react-flux-todo-list-demo-project/">
		<DefaultRoute handler={TodoApp} />
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler />, document.getElementById('todoapp'));
});
/* */



/* * /
React.render(
	<TodoApp />,
	document.getElementById('todoapp')
);
/* */