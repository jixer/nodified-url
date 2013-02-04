var model = require('../model');
var repo = new model.MongoRepository();

exports.redirect = function (req, res) {
    var uuid = req.params.uuid;
    repo.get(uuid, function (neurl, err) {
        if (err) {
            res.send(500, "Error occurred: " + err);
        }
        else if (!neurl) {
            res.send(404, "NeURL with ID '" + uuid + "' was not found");
        }
        else {
            res.redirect(neurl.Url);
        }
    });
};

exports.search = function (req, res) {
    if (req.params.searchphrase) {
        res.render('search', { searchPhrase: req.params.searchphrase });
    }
    else if (req.body.q) {
        res.render('search', { searchPhrase: req.body.q });
    }
    else {
        res.send(400, "Invalid search");
    }
};