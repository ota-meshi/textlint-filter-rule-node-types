// LICENSE : MIT
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = require("assert");
var defaultOptions = {
    /**
     * @type {string[]} array of node type string
     */
    nodeTypes: []
};
var message = "You forgot setting to options like { \"nodeTypes\" : [\"Str\", { \"ruleId\": \"no-todo\", \"types\": [\"BlockQuote\"] }] }";
module.exports = function (context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
    var shouldIgnore = context.shouldIgnore;

    var nodeTypes = options.nodeTypes || defaultOptions.nodeTypes;
    assert(Array.isArray(nodeTypes) && nodeTypes.length > 0, message);
    var rule = {};
    nodeTypes.forEach(function (typeEntry) {
        var types = void 0,
            ruleId = void 0;
        if (typeof typeEntry === "string") {
            types = [typeEntry];
            ruleId = "*";
        } else if ((typeof typeEntry === "undefined" ? "undefined" : _typeof(typeEntry)) === "object") {
            types = typeEntry.types;
            ruleId = typeEntry.ruleId;
            assert(Array.isArray(types) && types.length > 0, message);
            assert(typeof ruleId === "string", message);
        } else {
            assert.fail(message);
        }
        types.forEach(function (type) {
            rule[type] = function (node) {
                shouldIgnore(node.range, {
                    ruleId: ruleId
                });
            };
        });
    });
    return rule;
};
//# sourceMappingURL=textlint-filter-rule-node-types.js.map