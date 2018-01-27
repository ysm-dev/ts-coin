interface ITransaction {
    sender: string
    recipient: string
    amount: number

    dump?(): ITransaction
}

class Transaction implements ITransaction {
    sender: string
    recipient: string
    amount: number

    constructor(sender: string, recipient: string, amount: number) {
        this.sender = sender
        this.recipient = recipient
        this.amount = amount

        if (amount < 1) {
            throw 'Amount have to be positive number.'
        }
    }

    dump?(): ITransaction {
        return {
            sender: this.sender,
            recipient: this.recipient,
            amount: this.amount
        }
    }

    static initFromJSON(data): ITransaction {
        return new Transaction(data.sender, data.recipient, data.amount)
    }
}

export { ITransaction, Transaction }