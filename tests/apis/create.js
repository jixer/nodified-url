/*
    This set of unit tests is intended to define the operations needed to create NeURLs.
    
    
    Tests written using Mocha framework along with the following add-ons
        - supertest - simplifies express and HTTP app testing
        
*/    

var 
    app = require('../../server')
    , request = require("supertest");
    

// app.post('/apis/', routes.create);

describe("APIs", function() {
    describe("POST /apis", function() {
        describe("Valid URL passed in", function() {
            it("Should return a 201 response code", function(done) {
                request(app)
                    .post('/apis/')
                    .send({Url: 'http://google.com/'})
                    .expect(201, done);
            });
            
            it("Should return a valid URL in the body", function() {
                request(app)
                    .post('/apis/')
                    .send({Url: 'http://google.com/'})
                    .end(function(err, resp) {
                        resp.text.should.match(/\/.{6}/);
                    });
            });
        });
    });
});