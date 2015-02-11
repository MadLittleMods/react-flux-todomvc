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

// Some auto detection when in dev and on Github pages
var parentPath = '/random/react-flux-todo-list-demo-project/';
if(window.location.host === 'madlittlemods.github.io') {
	parentPath = '/react-flux-todomvc/';
}

var routes = (
	<Route handler={RouteHandler} path={parentPath} ignoreScrollBehavior>
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