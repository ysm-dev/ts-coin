"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Book_1 = require("./Book");
var Block_1 = require("./Block");
var Proof_1 = require("./Proof");
var GENESIS_HASH = 'g';
exports.GENESIS_HASH = GENESIS_HASH;
var Blockchain = (function () {
    function Blockchain(chain) {
        this.chain = [];
        this.book = new Book_1.Book();
        this.transactions = [];
        if (chain) {
            this.loadChain(chain);
        }
        else {
            this.initChain();
        }
    }
    Blockchain.prototype.initChain = function () {
        var genesisBlock = new Block_1.Block([], GENESIS_HASH);
        var genesisProof = Proof_1.findProof(genesisBlock);
        genesisBlock.proof(genesisProof);
        this.addBlock(genesisBlock);
    };
    Blockchain.prototype.addTransaction = function (transaction) {
        if (this.book.checkBalance(transaction)) {
            this.transactions.push(transaction);
            return this.chain.length;
        }
        else {
            throw 'Transaction is wrong.';
        }
    };
    Blockchain.prototype.newBlock = function () {
        var block = new Block_1.Block(this.transactions, this.lastBlock().hash());
        this.transactions = [];
        return block;
    };
    Blockchain.prototype.addBlock = function (block) {
        this.chain.push(block);
        this.book.apply(block.transactions);
    };
    Blockchain.prototype.valid = function () {
        var i = 1;
        while (i < this.chain.length) {
            if (this.chain[i].previousHash() !== this.chain[i - 1].hash()) {
                return false;
            }
            if (!Proof_1.validProof(this.chain[i])) {
                return false;
            }
            i++;
        }
        return true;
    };
    Blockchain.prototype.loadChain = function (chain) {
        var _this = this;
        chain.forEach(function (block) {
            block = Block_1.Block.initFromJSON(block);
            _this.addBlock(block);
        });
    };
    Blockchain.prototype.lastBlock = function () {
        return this.chain.slice(-1)[0];
    };
    Blockchain.prototype.dump = function () {
        return this.chain.map(function (block) { return block.dump(); });
    };
    Blockchain.prototype.length = function () {
        return this.chain.length;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
//# sourceMappingURL=Blockchain.js.map