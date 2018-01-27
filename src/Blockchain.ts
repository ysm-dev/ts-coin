import { IBlock } from './Block'
import { IBook } from './Book'
import { ITransaction } from './Transaction'
import { Book } from './Book'
import { Block } from './Block'
import { findProof, validProof } from './Proof'

interface IBlockchain {
    chain: IBlock[]
    book: IBook
    transactions: ITransaction[]

    initChain(): void

    addTransaction(transaction: ITransaction): number

    newBlock(): IBlock

    addBlock(block: IBlock): void

    valid(): boolean

    loadChain(chain: IBlock[]): void

    lastBlock(): IBlock

    dump(): IBlock[]

    length(): number
}

const GENESIS_HASH = 'g'

class Blockchain implements IBlockchain {
    chain: IBlock[]
    book: IBook
    transactions: ITransaction[]

    constructor(chain?: IBlock[]) {
        this.chain = []
        this.book = new Book()
        this.transactions = []
        if (chain) {
            this.loadChain(chain)
        } else {
            this.initChain()
        }
    }

    initChain(): void {
        const genesisBlock: IBlock = new Block([], GENESIS_HASH)
        const genesisProof: number = findProof(genesisBlock)
        genesisBlock.proof(genesisProof)
        this.addBlock(genesisBlock)
    }

    addTransaction(transaction: ITransaction): number {
        if (this.book.checkBalance(transaction)) {
            this.transactions.push(transaction)
            return this.chain.length
        } else {
            throw 'Transaction is wrong.'
        }
    }

    newBlock(): IBlock {
        const block = new Block(this.transactions, this.lastBlock().hash())
        this.transactions = []
        return block
    }


    addBlock(block: IBlock): void {
        this.chain.push(block)
        this.book.apply(block.transactions)
    }

    valid(): boolean {
        let i = 1
        while (i < this.chain.length) {
            if (this.chain[i].previousHash() !== this.chain[i - 1].hash()) {
                return false
            }

            if (!validProof(this.chain[i])) {
                return false
            }

            i++
        }
        return true
    }

    loadChain(chain: IBlock[]): void {
        chain.forEach(block => {
            block = Block.initFromJSON(block)
            this.addBlock(block)
        })
    }

    lastBlock(): IBlock {
        return this.chain.slice(-1)[0]
    }

    dump(): IBlock[] {
        return this.chain.map(block => block.dump())
    }

    length(): number {
        return this.chain.length
    }
}

export { IBlockchain, Blockchain, GENESIS_HASH }