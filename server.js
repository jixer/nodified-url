/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./SRC/routes')
  , apiroutes = require("./SRC/routes/api")
  , http = require('http')
  , path = require('path');

var app = module.exports = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/SRC/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use("/js", express.static(path.join(__dirname, '/SRC/js')));
    app.use("/css", express.static(path.join(__dirname, '/SRC/css')));
    app.use('/img', express.static(path.join(__dirname, '/SRC/img')));
    app.use('/public', express.static(path.join(__dirname, '/public')));
    app.use('/js/knockout.js', express.static(path.join(__dirname, '/node_modules/knockout/lib/knockout.js')));
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

// override default
app.get('/', function (req, res) {
    res.render('index');
});

// search routes
app.get('/search/:searchphrase', routes.search);
app.post('/search', routes.search);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});