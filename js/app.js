var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, NotFoundRoute, RouteHandler } = Router;

var TodoApp = require('./components/TodoApp.react');

var TodoConstants = require('./constants/TodoConstants');



// Some auto detection when in dev and on Github pages
var parentPath = '/random/react-flux-todo-list-demo-project/';
if(window.location.host === 'madlittlemods.github.io') {
	parentPath = '/react-flux-todomvc/';
}


/* */
var routes = (
	<Route handler={RouteHandler} path={parentPath} ignoreScrollBehavior>
		<DefaultRoute handler={TodoApp} />
		<NotFoundRoute handler={TodoApp} />
		
		<Route name="all" handler={TodoApp} />
		<Route name="active" handler={TodoApp} />
		<Route name="completed" handler={TodoApp} />
	</Route>
);

Router.create({
	routes: routes,
	location: Router.HistoryLocation
}).run(function (Handler, state) {
	var filter = TodoConstants.TODO_FILTER_ALL;

	var lastRoute = state.routes[state.routes.length - 1];
	if(lastRoute === 'all') {
		filter = TodoConstants.TODO_FILTER_ALL;
	}
	else if(lastRoute === 'active') {
		filter = TodoConstants.TODO_FILTER_ACTIVE;
	} 
	else if(lastRoute === 'completed') {
		filter = TodoConstants.TODO_FILTER_COMPLETED;
	}

	React.render(<Handler filter={filter} />, document.getElementById('todoapp'));
});
/* */





/* * /
function makeTodoAppWithFilter(filter) {
	return React.createClass({
		render: function() {
			return <TodoApp filter={filter} />
		}
	});
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