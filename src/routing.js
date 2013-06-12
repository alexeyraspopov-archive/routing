/*
	TODO: use params object for route keys
	TODO: listen 'hashchange'
*/
var routes = [];

function route(path, callback){
	routes.push({
		path: compile(path),
		callback: callback
	});
	// check?
}

function compile(path){
	path = path.replace(/\/?$/, '/?').replace(/\/:([^\/]+)/g, '\/([^\/]+)').replace(/\*/g, '.+');

	return new RegExp('^' + path + '$');
}

function check(){
	var index, route, hash = document.location.hash.slice(1);

	for(index = 0; index < routes.length; index++){
		route = routes[index];

		if(route.path.test(hash)){
			route.callback.apply(null, route.path.exec(hash).slice(1));
		}
	}
}

factory('route', route);
factory('check', check);
