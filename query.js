"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = require("./src/Transaction");
var index_1 = require("./index");
var addTransaction = function (req, res) {
    var transaction = Transaction_1.Transaction.initFromJSON(req.body);
    var nextIndex;
    try {
        nextIndex = index_1.blockchain.addTransaction(transaction);
    }
    catch (e) {
        res.send({ 'message': String(e) });
    }
    res.send({ 'message': "Transaction will be added to [" + nextIndex + "]th block." });
};
exports.addTransaction = addTransaction;
var getPendingTransactions = function (req, res) {
    res.send(JSON.stringify(index_1.blockchain.transactions.map(function (t) { return t.dump(); })));
};
exports.getPendingTransactions = getPendingTransactions;
var mine = function (req, res) {
    res.send(JSON.stringify({ message: 'New Block is Mined!', block: index_1.miner.mine(index_1.blockchain).dump() }));
};
exports.mine = mine;
var getFullChain = function (req, res) {
    res.send(JSON.stringify({ chain: index_1.blockchain.dump(), length: index_1.blockchain.length() }));
};
exports.getFullChain = getFullChain;
var getAllNodes = function (req, res) {
    res.send(JSON.stringify({ nodes: Array.from(index_1.node.neighbor).slice(), total: index_1.node.length() }));
};
exports.getAllNodes = getAllNodes;
var addNode = function (req, res) {
    index_1.node.add(req.hostname);
    res.send(JSON.stringify({ message: 'New Node is Added!', total: index_1.node.length() }));
};
exports.addNode = addNode;
var validChain = function (req, res) {
    res.send(JSON.stringify({ result: index_1.blockchain.valid() }));
};
exports.validChain = validChain;
//# sourceMappingURL=query.js.map