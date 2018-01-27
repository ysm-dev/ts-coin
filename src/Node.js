"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid4 = require("uuid4");
var Node = (function () {
    function Node(id) {
        this.id = id ? id : Node.generateId();
        this.neighbor = new Set();
    }
    Node.prototype.add = function (address) {
        this.neighbor.add(address);
    };
    Node.prototype.length = function () {
        return this.neighbor.size;
    };
    Node.generateId = function () {
        return String(uuid4()).replace('-', '');
    };
    Node.fetchNeighborChain = function (address) {
        return fetch(address + "/chain")
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=Node.js.map