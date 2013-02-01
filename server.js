/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./SRC/routes')
  , apiroutes = require("./SRC/routes/api")
  , http = require('http')
  , path = require('path');

var app = module.exports = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/js", express.static(__dirname + '/js'));
  app.use("/css", express.static(__dirname + '/css'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// API routes
app.post('/apis/', apiroutes.create);
app.get('/apis/:uuid', apiroutes.find);
app.get('/apis/search/:search', apiroutes.search);
app.patch('/apis/', apiroutes.update);

// MVC app routes
app.get("/:uuid", routes.redirect);

/*
app.post('/', routes.create);
app.get('/', routes.request);
app.get('/search', routes.getsearch);
app.get('/delete/:uuid', routes.delete);
app.post('/search', routes.postsearch);
app.get('/:uuid', routes.find);
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});