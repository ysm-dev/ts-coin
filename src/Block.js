"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha256 = require("sha256");
var Transaction_1 = require("./Transaction");
var Proof_1 = require("./Proof");
var BlockHeader = (function () {
    function BlockHeader(previousHash, timestamp, difficulty, proof) {
        if (previousHash === void 0) { previousHash = ''; }
        if (timestamp === void 0) { timestamp = 0; }
        if (difficulty === void 0) { difficulty = 0; }
        if (proof === void 0) { proof = 0; }
        this.previousHash = previousHash;
        this.timestamp = (timestamp) ? timestamp : Date.now();
        this.difficulty = (difficulty) ? difficulty : Proof_1.DIFFICULTY;
        this.proof = proof;
    }
    BlockHeader.prototype.hash = function () {
        var headerDump = this.dump();
        delete headerDump.proof;
        return sha256(JSON.stringify(headerDump));
    };
    BlockHeader.prototype.dump = function (proof) {
        return {
            previousHash: this.previousHash,
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            proof: (proof) ? 0 : this.proof
        };
    };
    BlockHeader.initFromJSON = function (data) {
        return new BlockHeader(data.previousHash, data.timestamp, data.difficulty, data.proof);
    };
    return BlockHeader;
}());
exports.BlockHeader = BlockHeader;
var Block = (function () {
    function Block(transactions, previousHash) {
        if (previousHash === void 0) { previousHash = ''; }
        this.transactions = transactions;
        this.header = new BlockHeader(previousHash);
    }
    Block.prototype.previousHash = function () {
        return this.header.previousHash;
    };
    Block.prototype.difficulty = function () {
        return this.header.difficulty;
    };
    Block.prototype.proof = function (value) {
        if (value) {
            this.header.proof = value;
        }
        else {
            return this.header.proof;
        }
    };
    Block.prototype.hash = function () {
        return sha256(JSON.stringify(this.dump()));
    };
    Block.prototype.dump = function () {
        return {
            header: this.header.dump(),
            transactions: this.transactions.slice()
        };
    };
    Block.initFromJSON = function (data) {
        var transactions = data.transactions
            .map(function (t) { return Transaction_1.Transaction.initFromJSON(t); });
        var header = BlockHeader.initFromJSON(data.header);
        var newBlock = new Block(transactions);
        newBlock.header = header;
        return newBlock;
    };
    return Block;
}());
exports.Block = Block;
//# sourceMappingURL=Block.js.map