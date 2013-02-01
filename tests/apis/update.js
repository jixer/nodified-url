/*
    This set of unit tests is intended to define the operations needed to find NeURLs.
    
    
    Tests written using Mocha framework along with the following add-ons
        - supertest - simplifies express and HTTP app testing

Invoked through HTTP PATCH ✓
Returns 205 (Reset Content) if the item is updated ✓
Accepts NeURL data in the body of the PATCH ✓
Requires, at a minimum that an ID is provided in the request data ✓
Returns 500 if error occurs ✓
Returns 404 if the ID provided in the request does not exist  ✓
        
*/    
var 
    app = require('../../server')
    , request = require("supertest")
    , should = require("should");

var validNeURL =
{
    "Url": "http://google.com/?q=1234567890",
    "_id": "vHrJGD"
};

var missingId =
{
    "Url": "http://google.com/?q=1234567890"
};

var invalidId =
{
    "_id": "IDoNotExist",
    "Url": "http://google.com/"
};

describe("APIs", function () {
    describe("PATCH /apis/update", function () {
        describe("When a NeURL is updated through PATCH", function () {
            describe("And the PATCH data corresponds to an existing NeURL", function () {
                it("Should return a 205 status code", function (done) {
                    request(app)
                        .patch('/apis/')
                        .send(validNeURL)
                        .expect(205, done);
                });
            });

            describe("And no ID is provided", function () {
                it("Should return a 400 response code", function (done) {
                    request(app)
                        .patch('/apis/')
                        .send(missingId)
                        .expect(400, done);
                });
            });

            describe("And ID of non-existant NeURL is provided", function () {
                it("Should return a 404 response code", function (done) {
                    request(app)
                        .patch('/apis/')
                        .send(invalidId)
                        .expect(404, done);
                });
            });
        });
    });
});