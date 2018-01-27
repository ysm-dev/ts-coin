"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var query_1 = require("./query");
var bodyParser = require("body-parser");
var Node_1 = require("./src/Node");
var Miner_1 = require("./src/Miner");
var Blockchain_1 = require("./src/Blockchain");
var app = express();
app.use(bodyParser.json());
exports.node = new Node_1.Node();
exports.miner = new Miner_1.Miner(exports.node.id);
exports.blockchain = new Blockchain_1.Blockchain();
app.post('/transaction', query_1.addTransaction);
app.get('/transaction', query_1.getPendingTransactions);
app.post('/mine', query_1.mine);
app.get('/chain', query_1.getFullChain);
app.get('/node', query_1.getAllNodes);
app.post('/node', query_1.addNode);
app.get('/chain/valid', query_1.validChain);
app.listen(3000, function () {
    console.log('Server Listening now in localhost:3000');
});
//# sourceMappingURL=index.js.map