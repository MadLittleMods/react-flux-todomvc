# React Flux TodoMVC

[Classic TodoMVC](http://todomvc.com/) w/ [React](http://facebook.github.io/react/) and [Flux](http://facebook.github.io/flux/) architecture + sprinkle of best practices.

This project was started by following the [Flux TodoMVC tutorial](http://facebook.github.io/flux/docs/todo-list.html).

 - Using the [`react-router`](https://github.com/rackt/react-router) to provide meaningful urls for filtering
 	 - `http://app.com/all`, `http://app.com/active`, `http://app.com/completed`
 - Filtering. This is in the actual TodoMVC spec but not implmented in the Flux tutorial.
 - Using [Immutable.js](http://facebook.github.io/immutable-js/) for data structures
 - Debounced persistant saving to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
