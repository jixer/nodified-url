/*
    This set of unit tests is intended to describe the redirect route for the MVC Express application.    
    
    Tests written using Mocha framework along with the following add-ons
        - supertest - simplifies express and HTTP app testing
    Cecklist
    ✓     Must return a 305 status code
    ✓    Must return 404 if ID does not exit
    ✓    ID passed in through URI
    ✓    Location must point to NeURL URL
*/

var 
    app = require('../server')
    , request = require("supertest")
    , should = require("should");

var googleUrl =
{
    "Url": "http://google.com/?q=1234567890",
    "__v": 0,
    "_id": "vHrJGD"
};

describe("MVC Express redirect route (/redirect/:uuid)", function () {
    describe("When provided an ID that exists in the db", function () {
        it("Shall return a 302 (moved temporarily) status code", function (done) {
            request(app)
                .get("/" + googleUrl._id)
                .expect(302, done);
        });


        it("Shall return the location of the URL", function (done) {
            request(app)
                .get("/" + googleUrl._id)
                .expect("Location", "http://google.com/?q=1234567890", done);
        });
    });

    describe("When provided an ID that does not exists in the db", function () {
        it("Shall return a 404 status code", function (done) {
            request(app)
                .get("/" + "IDoNotExist")
                .expect(404, done);
        });

        it("Shall return a useful description", function (done) {
            request(app)
                .get("/" + "IDoNotExist")
                .end(function (err, resp) {
                    resp.text.should.equal("NeURL with ID 'IDoNotExist' was not found");
                    done();
                });
        });
    });
});