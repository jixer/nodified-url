var model = require('../../model');
var repo = new model.MongoRepository();

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
}