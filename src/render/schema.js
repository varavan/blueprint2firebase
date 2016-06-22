var schemaTemplate = require('swig').compileFile(__dirname + '/../twig/table.twig'),
    requiredFieldsTemplate = require('swig').compileFile(__dirname + '/../twig/required-fields.twig'),
    fieldTemplate = require('swig').compileFile(__dirname + '/../twig/field.twig'),
    fieldNumberTemplate = require('swig').compileFile(__dirname + '/../twig/field-number.twig'),
    fieldStringTemplate = require('swig').compileFile(__dirname + '/../twig/field-string.twig');

var _ = require('underscore');
var util = require('./util.js');

var invokeCallbackOnEachMember = function (datastructure, callback) {

    _.each(datastructure.content[0].content, function (field) {
        callback(field);
    });
};

var parseRequiredFields = function (datastructure) {
    var requiredFields = [];

    invokeCallbackOnEachMember(datastructure, function (field) {
        if (field.attributes != undefined && field.attributes.typeAttributes != undefined) {
            _.each(field.attributes.typeAttributes, function (atttribute) {
                if (atttribute == 'required') {
                    requiredFields.push(field);
                }
            });
        }
    });

    return util.cleanString(requiredFieldsTemplate({fields: requiredFields}));
};


var parseFields = function (datastructure) {
    var fields = [];

    invokeCallbackOnEachMember(datastructure, function (field) {
        fields.push(
            util.cleanString(fieldTemplate({
                name: field.content.key.content,
                write: (field.content.value.element == 'number')
                    ? util.cleanString(fieldNumberTemplate())
                    : util.cleanString(fieldStringTemplate())
            }))
        );
    });

    return fields;
};

module.exports = function (datastructure) {

    var tableName = datastructure.content[0].meta.id;
    var read = "true";
    var write = parseRequiredFields(datastructure);
    var isLast = false;

    return schemaTemplate({
        name: tableName,
        read: read,
        write: write,
        isLast: isLast,
        fields: parseFields(datastructure)
    });
};
