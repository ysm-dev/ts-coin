"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Proof_1 = require("./Proof");
var Transaction_1 = require("./Transaction");
var GENESIS_ACCOUNT_ID = '0';
exports.GENESIS_ACCOUNT_ID = GENESIS_ACCOUNT_ID;
var AMOUNT_OF_REWARD = 1;
exports.AMOUNT_OF_REWARD = AMOUNT_OF_REWARD;
var Miner = (function () {
    function Miner(accountId) {
        this.accountId = accountId;
    }
    Miner.prototype.mine = function (blockchain) {
        var transaction = new Transaction_1.Transaction(GENESIS_ACCOUNT_ID, this.accountId, AMOUNT_OF_REWARD);
        blockchain.addTransaction(transaction);
        var newBlock = blockchain.newBlock();
        var newProof = Proof_1.findProof(newBlock);
        newBlock.proof(newProof);
        blockchain.addBlock(newBlock);
        return newBlock;
    };
    return Miner;
}());
exports.Miner = Miner;
//# sourceMappingURL=Miner.js.map