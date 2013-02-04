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
exports.create = function (req, res) {
    var neurl = req.body;
    if (neurl === null || neurl.Url === undefined || neurl.Url === null) {
        res.send(400, "Must specify a NeURL to create!");
    }
    else {
        repo.create(neurl.Url, function (neurlObj, err) {
            if (err)
                res.send(500, "Error occurred creating NeURL: " + err);
            else {
                res.set('Location', 'http://neurl.us/' + neurlObj._id);
                res.send(201, "http://neurl.us/" + neurlObj._id);
            }
        });
    }
};

// GET /apis/search/:search
exports.search = function (req, res) {
    var searchPhrase = req.params.search;
    console.log(searchPhrase);
    repo.search(searchPhrase, function (err, queryResponse) {
        if (err)
            res.send(500, "Error occurred searching for NeURLs: " + err);
        else if (queryResponse === undefined || queryResponse === null
                || queryResponse.length === null || queryResponse.length == 0) {
            res.send(404, "No NeURLs found for the following search phrase: " + searchPhrase);
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send(200, JSON.stringify(queryResponse));
        }
    });
};

// PATCH /apis/
exports.update = function (req, res) {
    var neurl = req.body;
    if (neurl === null || neurl.Url === undefined || neurl.Url === null) {
        res.send(400, "Must specify a NeURL to update!");
    }
    else if (neurl._id == undefined) {
        res.send(400, "Must specify a NeURL ID to update!");
    }
    else {
        repo.update(neurl, function (err, updatedObj) {
            if (err) {
                res.send(500, "Error occurred: " + err);
            }
            else if (updatedObj === null) {
                res.send(404, "Object with id '" + neurl._id + "' could not be found in db");
            }
            else {
                res.send(205, JSON.stringify(updatedObj));
            }
        });
    }
};