
/*
 * GET home page.
 */
var model = require('../model');
var repo = new model.MongoRepository();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.find = function(req, res) {
	var uuid = req.params.uuid;
	repo.get(uuid, function(nurl) {
		console.log('Nurl: ' + JSON.stringify(nurl));
		if (nurl && nurl.Url) {
			res.send(nurl.Url);
		}
		else {
			res.send('not found');
		}
	});
};

exports.create = function(req, res) {
	var url = req.body.url;
	console.log(url);
	repo.create(url, function(nurl, err) {
		console.log('Nurl: ' + JSON.stringify(nurl));
		if (!err) {
			res.send('http://localhost:3000/' + nurl._id);
		}
		else {
			res.send('Err: ' + err);
		}
	});
};

exports.request = function(req, res) {
	
}