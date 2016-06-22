var baseTemplate = require('swig').compileFile(__dirname + '/../twig/base.twig');
var schemaRender = require('./schema.js');
var _ = require('underscore');
var util = require('./util.js');

module.exports = function(datastructures){

    var schemas = '';
    _.each(datastructures, function(datastructure){
        schemas += schemaRender(datastructure);
    });

    return util.cleanString(baseTemplate({schema:  schemas }));
}