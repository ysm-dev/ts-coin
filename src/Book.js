"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Miner_1 = require("./Miner");
var Account = (function () {
    function Account(target, amount) {
        if (target === void 0) { target = []; }
        if (amount === void 0) { amount = []; }
        this.target = target;
        this.amount = amount;
    }
    Account.prototype.sum = function () {
        return this.amount.reduce(function (sum, x) { return sum + x; }, 0);
    };
    Account.prototype.add = function (target, amount) {
        this.target.push(target);
        this.amount.push(amount);
    };
    return Account;
}());
exports.Account = Account;
var Book = (function () {
    function Book() {
        this.account = {};
    }
    Book.prototype.checkBalance = function (transaction) {
        if (transaction.sender === Miner_1.GENESIS_ACCOUNT_ID) {
            return true;
        }
        if (this.account[transaction.sender]) {
            return this.account[transaction.sender].sum() - transaction.amount >= 0;
        }
        else {
            return false;
        }
    };
    Book.prototype.getAccount = function (accountId) {
        if (!this.account[accountId]) {
            this.account[accountId] = new Account();
        }
        return this.account[accountId];
    };
    Book.prototype.apply = function (transactions) {
        var _this = this;
        transactions.forEach(function (t) {
            var sender = _this.getAccount(t.sender);
            var recipient = _this.getAccount(t.recipient);
            sender.add(recipient, -t.amount);
            recipient.add(sender, t.amount);
        });
    };
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=Book.js.map