import * as sha256 from 'sha256'
import { ITransaction } from './Transaction'
import { Transaction } from './Transaction'
import { DIFFICULTY } from './Proof';

interface IBlockHeader {
    previousHash: string
    timestamp: number
    difficulty: number
    proof: number

    hash?(): string

    dump?(proof?: boolean): IBlockHeader
}

class BlockHeader implements IBlockHeader {
    previousHash: string
    timestamp: number
    difficulty: number
    proof: number

    constructor(previousHash: string = '',
                timestamp: number = 0,
                difficulty: number = 0,
                proof: number = 0) {
        this.previousHash = previousHash
        this.timestamp = (timestamp) ? timestamp : Date.now()
        this.difficulty = (difficulty) ? difficulty : DIFFICULTY
        this.proof = proof
    }

    hash(): string {
        const headerDump: IBlockHeader = this.dump()
        delete headerDump.proof
        return sha256(JSON.stringify(headerDump))
    }

    dump(proof?: boolean) {
        return {
            previousHash: this.previousHash,
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            proof: (proof) ? 0 : this.proof
        }
    }

    static initFromJSON(data: IBlockHeader): IBlockHeader {
        return new BlockHeader(
            data.previousHash,
            data.timestamp,
            data.difficulty,
            data.proof)
    }
}

interface IBlock {
    transactions: ITransaction[]
    header: IBlockHeader

    previousHash?(): string

    difficulty?(): number

    proof?(value?: number): number | void

    hash?(): string

    dump?(): IBlock
}

class Block implements IBlock {
    transactions: ITransaction[]
    header: IBlockHeader

    constructor(transactions: ITransaction[],
                previousHash: string = '') {
        this.transactions = transactions
        this.header = new BlockHeader(previousHash)
    }

    previousHash(): string {
        return this.header.previousHash
    }

    difficulty(): number {
        return this.header.difficulty
    }

    proof(value?: number): number | void {
        if (value) {
            this.header.proof = value
        } else {
            return this.header.proof
        }
    }

    hash(): string {
        return sha256(JSON.stringify(this.dump()))
    }


    dump(): IBlock {
        return {
            header: this.header.dump(),
            transactions: [...this.transactions]
        }
    }

    static initFromJSON(data: IBlock): IBlock {
        const transactions: ITransaction[] = data.transactions
            .map(t => Transaction.initFromJSON(t))
        const header: IBlockHeader = BlockHeader.initFromJSON(data.header)
        const newBlock: IBlock = new Block(transactions)
        newBlock.header = header
        return newBlock
    }
}

export { IBlockHeader, BlockHeader, Block, IBlock }