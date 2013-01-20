var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://neurl:Test123!@ds041157.mongolab.com:41157/neurl');

var schema = mongoose.Schema({ _id: { type: 'string', default: genUuid}, Url: 'string' });
var NodifiedUrl = db.model('NodifiedUrl', schema);


var MongoRepository = function() {};
MongoRepository.prototype.create = function(url, callback) {
	var nurl = new NodifiedUrl({ Url: url });
	nurl.save(function(err) {
		callback(nurl, err);
	});
};


MongoRepository.prototype.get = function(uuid, callback) {
	NodifiedUrl.findById(uuid, function(err, nurl) {
		if (err) callback(null, err);
		callback(nurl);
	});
};

MongoRepository.prototype.search = function(searchPhrase, callback) {
	var query = NodifiedUrl.find({}).limit(10).where('Url', /^.+$/).where('Url', new RegExp("^.*" + searchPhrase + ".*$"));
	query.exec(function(err, queryResult) {
		if (err) throw err;
		callback(queryResult);
	});
};

MongoRepository.prototype.delete = function(uuid, callback) {
	var item = NodifiedUrl.findById(uuid, function(err, nurl) {
		if (err) throw err;
		item.remove(function(err, result) {
			if (err) throw err;
			callback();
		});
	});
};


function genUuid() {
	var characterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // len = 24 + 24 + 10 = 58
	var characters = characterStr.split('');
	var uuid = "";
	for (var i = 0; i < 6; i++) {
		var rand = Math.round(Math.random() * 58);
		uuid = uuid + characters[rand];
	}

	return uuid;
}

exports.MongoRepository = MongoRepository;