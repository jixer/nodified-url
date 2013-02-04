/*
    This set of unit tests is intended to define the operations needed to GET NeURLs.
    
    
    Tests written using Mocha framework along with the following add-ons
        - supertest - simplifies express and HTTP app testing
        
*/    

var 
    app = require('../../server')
    , request = require("supertest")
    , should = require("should");

var neurlObj =
{
    "Url": "http://google.com/",
    "_id": "EG2pny",
    "__v": 0
};

describe("APIs", function () {
    describe("GET /apis", function () {
        describe("When retrieving an existing NeURL from the APIs", function () {
            it("Should return a 200 status code", function (done) {
                request(app)
                    .get('/apis/' + neurlObj._id)
                    .expect(200, done);
            });

            it("Should return the original object", function (done) {
                request(app)
                    .get('/apis/' + neurlObj._id)
                    .end(function (err, resp) {
                        resp.text.should.equal(JSON.stringify(neurlObj));
                        done();
                    });
            });

            it("Should return application/json data", function (done) {
                request(app)
                    .get('/apis/' + neurlObj._id)
                    .expect('Content-Type', 'application/json', done);
            });
        });

        describe("When retrieving a non-existent NeURL from the APIs", function () {
            it("Should return a 404 status code", function (done) {
                request(app)
                    .get('/apis/IDoNotExist')
                    .expect(404, done);
            });

            it("Should return the correct error message", function (done) {
                request(app)
                    .get('/apis/IDoNotExist')
                    .end(function (err, resp) {
                        resp.text.should.equal("NeURL with ID 'IDoNotExist' does not exist");
                        done();
                    });
            });
        });
    });
});
