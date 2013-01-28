/*
    This set of unit tests is intended to define the operations needed to find NeURLs.
    
    
    Tests written using Mocha framework along with the following add-ons
        - supertest - simplifies express and HTTP app testing
        
*/    
var 
    app = require('../../server')
    , request = require("supertest")
    , should = require("should");

describe("APIs", function () {
    describe("GET /apis/search", function () {
        describe("When valid search phrase used", function () {
            it("Should return a 200 response code", function (done) {
                request(app)
                    .get('/apis/search/google')
                    .expect(200, done);
            });

            it("Should return JSON data", function (done) {
                request(app)
                    .get('/apis/search/google')
                    .expect('Content-Type', 'application/json', done);
            });

            it("Should return a JSON array", function (done) {
                request(app)
                    .get('/apis/search/google')
                    .end(function (err, res) {
                        var results = JSON.parse(res.text);
                        results.length.should.be.above(0);
                        done();
                    })
            });

            describe("And URI is encoded", function () {
                it("Should return 200 response code", function (done) {
                    var encodedUrl = encodeURIComponent("http://google.com");
                    request(app)
                        .get('/apis/search/' + encodedUrl)
                        .expect(200, done);
                });
            })
        });

        describe("When a non-existant search string is used", function () {
            it("Should return a 404 status code", function (done) {
                request(app)
                    .get('/apis/search/IDoNotExist')
                    .expect(404, done);
            });
        });
    });
});