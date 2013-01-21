var model = require('../model');
var repo = new model.MongoRepository();

// GET /
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//GET /:uuid
exports.find = function(req, res) {
	var uuid = req.params.uuid;
	repo.get(uuid, function(nurl) {
		console.log('Nurl: ' + JSON.stringify(nurl));
		if (nurl && nurl.Url) {
			res.render('redirect', { title: "Find URL", url: nurl.Url });
		}
		else {
			res.send('not found');
		}
	});
};

// POST /
exports.create = function(req, res) {
	var url = req.body.url;
	repo.create(url, function(nurl, err) {
		if (!err) {
			res.render('created', { title: 'Created URL', oldUrl: nurl.Url, newUrl: 'http://localhost:3000/' + nurl._id });
		}
		else {
			res.send('Err: ' + err);
		}
	});
};

// GET /
exports.request = function(req, res) {
	res.render('request', { title: 'Create URL' });
};

exports.getsearch = function(req, res) {
	res.render('search', { title: 'Search URLs' });
};

exports.postsearch = function(req, res) {
	var searchPhrase = req.body.query;
	repo.search(searchPhrase, function(results) {
		console.log(JSON.stringify(results));
		if (req.get('Content-Type') == 'application/json') {
			res.send(JSON.stringify(results));
		}
		else {
			res.render('search', {title: 'Search URLs', results: results});
		}		
	});	
};

exports.delete = function(req, res) {
	repo.delete(function() {
		res.send("Successfully deleted");
	});
};