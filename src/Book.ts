import { ITransaction } from './Transaction'
import { GENESIS_ACCOUNT_ID } from './Miner'

interface IAccount {
  target: IAccount[]
  amount: number[]
  sum(): number
  add(target: IAccount, amount: number): void
}

class Account implements IAccount {
  target: IAccount[]
  amount: number[]

  constructor(target: IAccount[] = [], amount: number[] = []) {
    this.target = target
    this.amount = amount
  }

  sum(): number {
    return this.amount.reduce((sum, x) => sum + x, 0)
  }

  add(target: IAccount, amount: number): void {
    this.target.push(target)
    this.amount.push(amount)
  }
}

interface IBook {
  account: object
  checkBalance(transaction: ITransaction): boolean
  getAccount(accountId: string): IAccount
  apply(transactions: ITransaction[]): void
}

class Book implements IBook {
  account: object

  constructor() {
    this.account = {}
  }

  checkBalance(transaction: ITransaction): boolean {
    if (transaction.sender === GENESIS_ACCOUNT_ID) {
      return true
    }
    if (this.account[transaction.sender]) {
      return this.account[transaction.sender].sum() - transaction.amount >= 0
    } else {
      return false
    }
  }

  getAccount(accountId: string): IAccount {
    if (!this.account[accountId]) {
      this.account[accountId] = new Account()
    }
    return this.account[accountId]
  }

  apply(transactions: ITransaction[]): void {
    transactions.forEach(t => {
      const sender = this.getAccount(t.sender)
      const recipient = this.getAccount(t.recipient)

      sender.add(recipient, -t.amount)
      recipient.add(sender, t.amount)
    })
  }
}

export { IAccount, Account, IBook, Book }