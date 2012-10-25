var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://ds041157.mongolab.com:41157/neurl');

var schema = mongoose.Schema({ _id: { type: 'string', default: genUuid}, Url: 'string' });
var NodifiedUrl = db.model('NodifiedUrl', schema);


var MongoRepository = function() {};
MongoRepository.prototype.create = function(url, callback) {
	var nurl = new NodifiedUrl({ Url: url });
	nurl.save(function(err) {
		console.log(err);
		callback(nurl, err);
	});
};


MongoRepository.prototype.get = function(uuid, callback) {
	console.log(uuid);
	NodifiedUrl.findById(uuid, function(err, nurl) {
		if (err) throw err;
		callback(nurl);
	});
};


function genUuid() {
	console.log('call to \'genUuid\'');
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