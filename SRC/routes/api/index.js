var model = require('../../model');
var repo = new model.MongoRepository();

// GET /api/:uuid
exports.find = function (req, res) {
    var uuid = req.params.uuid;
    repo.get(uuid, function (nurl, err) {
        if (err) {
            res.send(500, "Error occurred: " + err);
        }
        else {
            if (nurl && nurl.Url) {
                res.set('Content-Type', 'application/json');
                res.send(200, JSON.stringify(nurl));
            }
            else {
                res.send(404, "NeURL with ID '" + uuid + "' does not exist");
            }
        }
    });
};

// POST /api/
exports.create = function(req, res) {
    var neurl = req.body;
    if (neurl === null || neurl.Url === undefined || neurl.Url === null) {
        res.send(400, "Must specify a NeURL to create!");
    }
    else {
        repo.create(neurl.Url, function(neurlObj, err) {
            if (err) 
                res.send(500, "Error occurred creating NeURL: " + err);
            else 
                res.send(201, "/" + neurl._id);
        });
    }
};