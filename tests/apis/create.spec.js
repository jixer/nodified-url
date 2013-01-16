/*
    This set of unit tests is intended to define the operations needed to create NeURLs.
    
    
    Tests written using Jasmine framework 
        - asynchrous operations using 'run' and 'waitFor'
        - suites
        - specs
        - spies
        - setup and teardown
        
    Documentation for Jasmine can be found here: http://pivotal.github.com/jasmine/
*/
var apis = require("../../routes/api");

describe("When creating a customer through the API", function() {    
    describe("And providing a valid URL", function() {
        
        var responseStub = createSpyObj('res', ['send']);
        var req = 
            {
                body: { Url: 'http://google.com/' }
            };
            
        it("Should return a 201 response code", function() {
            runs(function() {
                apis.create(req, responseStub);
            });
            
            waitsFor(function() { 
                return responseStub.send.calls[0] != null;
            }, "Verify 1st call is made", 20000);
        
            runs(function() {
                expect(responseStub.send.calls[0].args[0]).toEqual(201);
            });
        });
        
        it("Should return a valid URL in the body", function() {
            runs(function() {
                apis.create(req, responseStub);
            });
            
            waitsFor(function() { 
                return responseStub.send.calls[1] != null;
            }, "Verify 1st call is made", 20000);
        
            runs(function() {
                expect(responseStub.send.calls[1].args[1]).toMatch(/\/.{6}/);
            });
        });
    });
    
    describe("And no parameters are specified", function() {
        it("Should return a 400 message", function() {
            var invalidResponseStub2 = createSpyObj('res', ['send']);
            var req = 
                {
                    body: null
                };
                
            runs(function() {
                apis.create(req, invalidResponseStub2);
            });
            
            waitsFor(function() {
               return invalidResponseStub2.send.mostRecentCall.args !== null; 
            });
            
            runs(function() {
                console.log(invalidResponseStub2);
                expect(invalidResponseStub2.send.mostRecentCall.args[0]).toEqual(400);
            })
        });
    });
    
    describe("And invalid parameters are specified", function() {
        it("Should return a 400 message", function() {
            var invalidResponseStub = createSpyObj('res', ['send']);
            var req = 
                {
                    body: { Uri: 'http://google.com/' } // Uri is an invalid property.  URL is expected
                };
                
            runs(function() {
                apis.create(req, invalidResponseStub);
            });
            
            waitsFor(function() {
               return invalidResponseStub.send.mostRecentCall.args !== null; 
            });
            
            runs(function() {
                console.log(invalidResponseStub);
                expect(invalidResponseStub.send.mostRecentCall.args[0]).toEqual(400);
            })
        });
    });
});