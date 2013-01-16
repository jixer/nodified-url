/*
    This set of unit tests is intended to define the operations needed to create NeURLs.
    
    
    Tests written using Jasmine framework 
        - asynchrous operations using 'run' and 'waitFor'
        - suites
        - specs
        - spies
        
    Documentation for Jasmine can be found here: http://pivotal.github.com/jasmine/
*/
var apis = require("../../routes/api");
var neurlId = "iZwzkt";
var neurlObj = 
{
    "Url": "http://google.com/",
    "_id": "iZwzkt",
    "__v": 0
};

describe("When retrieving an existing NeURL from the APIs", function() {    
    var responseStub = createSpyObj('res', ['send']);
    it("Should return a 200 status code", function() {
        runs(function() {
            apis.find({ params: { uuid: neurlObj._id} }, responseStub);
        });
        
        waitsFor(function() {
            return responseStub.send.calls[0] !== undefined;
        });
        
        runs(function() {
            expect(responseStub.send.calls[0].args[0]).toEqual(200);
        });
    });
    
    it("Should return the original object", function() {
        runs(function() {
            apis.find({ params: { uuid: neurlObj._id} }, responseStub);
        });
        
        waitsFor(function() {
            return responseStub.send.calls[1] !== undefined;
        });
        
        runs(function() {   
            console.log(responseStub.send.calls[1]);
            var retrievedObj = JSON.parse(responseStub.send.calls[1].args[1]);
            console.log(retrievedObj);
            expect(retrievedObj).toEqual(neurlObj);
        });
    });    
    
});

describe("When retrieving a non-existent NeURL from the APIs", function() {
    var responseStub2 = createSpyObj('res', ['send']);
    it("Should return a 404 status code", function() {
        runs(function() {
            apis.find({ params: { uuid: 'IDoNotExist'} }, responseStub2);
        });
        
        waitsFor(function() {
            return responseStub2.send.calls[0] !== undefined;
        });
        
        runs(function() {
            expect(responseStub2.send.calls[0].args[0]).toEqual(404);
        });
    });
    
    it("Should return the correct error message", function() {
        runs(function() {
            apis.find({ params: { uuid: 'IDoNotExist'} }, responseStub2);
        });
        
        waitsFor(function() {
            return responseStub2.send.calls[1] !== undefined;
        });
        
        runs(function() {
            console.log()
            expect(responseStub2.send.calls[1].args[1]).toEqual("NeURL with ID 'IDoNotExist' does not exist");
        });
    });
});