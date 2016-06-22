var fs = require('fs')
var protagonist = require('protagonist');
var renderObject = require('./render/base.js');

var createFile = function(data, targetFile){
    fs.writeFile(targetFile, data, [], function(){
        console.log('done');
    });
}
var parseBlueprint = function (blueprintDocument, callback) {
    protagonist.parse(blueprintDocument, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }

        var datastructures = result.content[0].content[1].content;
        callback(renderObject(datastructures));

    });
};

module.exports = function(blueprintDocument, targetFile){

    parseBlueprint(blueprintDocument, function(data){
        createFile(data, targetFile);
    })
}
