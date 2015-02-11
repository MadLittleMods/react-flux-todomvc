# React Flux TodoMVC

[Classic TodoMVC](http://todomvc.com/) w/ [React](http://facebook.github.io/react/) and [Flux](http://facebook.github.io/flux/) architecture + sprinkle of best practices.

This project was started by following the [Flux TodoMVC tutorial](http://facebook.github.io/flux/docs/todo-list.html).

 - [Webpack](http://webpack.github.io/) for builds
 - Using the [`react-router`](https://github.com/rackt/react-router) to provide meaningful urls for filtering
 	 - `http://app.com/all`, `http://app.com/active`, `http://app.com/completed`
 - Filtering. This is in the actual TodoMVC spec but not implmented in the Flux tutorial.
 - Using [Immutable.js](http://facebook.github.io/immutable-js/) for data structures
 - Debounced persistant saving to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

# [Live Demo](http://madlittlemods.github.io/react-flux-todomvc/)

# Run/Build

To build:

 - Clone the repo
 - `npm install`
 - `npm install webpack -g`
 - `webpack`
 - Set up your server to serve the app for all the sub-urls. [Instructions for Apache below](#apache-configurationsetup).
 - Serve up the files



# Apache Configuration/Setup

In order to serve the same app from any sub path (filters, `http://app.com/active`, in this case), we have tell Apache.

```apache
# All paths in todomvc/ directory will be served by the index
# http://app.com/todomvc
# http://app.com/todomvc/foo/bar
<Directory "c:/wamp/www/todomvc">
	RewriteEngine On
	# The normal index.html is fine so don't touch it
	RewriteRule ^index\.html$ - [L]
	# Anything that isn't a file or directory isn't messed up or rewrote
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	# Rewrite everything back to the root
	RewriteRule . /todomvc/ [L]
</Directory>
```