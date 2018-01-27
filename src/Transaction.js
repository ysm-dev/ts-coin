"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = (function () {
    function Transaction(sender, recipient, amount) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        if (amount < 1) {
            throw 'Amount have to be positive number.';
        }
    }
    Transaction.prototype.dump = function () {
        return {
            sender: this.sender,
            recipient: this.recipient,
            amount: this.amount
        };
    };
    Transaction.initFromJSON = function (data) {
        return new Transaction(data.sender, data.recipient, data.amount);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map