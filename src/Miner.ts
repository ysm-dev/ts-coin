import { IBlockchain } from './Blockchain';
import { IBlock } from './Block';
import { findProof } from './Proof';
import { Transaction } from './Transaction';

const GENESIS_ACCOUNT_ID: string = '0'
const AMOUNT_OF_REWARD: number = 1

interface IMiner {
    accountId: string

    mine(blockchain: IBlockchain): IBlock
}

class Miner implements IMiner {
    accountId: string

    constructor(accountId: string) {
        this.accountId = accountId
    }

    mine(blockchain: IBlockchain): IBlock {
        const transaction = new Transaction(GENESIS_ACCOUNT_ID, this.accountId, AMOUNT_OF_REWARD)
        blockchain.addTransaction(transaction)

        const newBlock: IBlock = blockchain.newBlock()

        const newProof = findProof(newBlock)

        newBlock.proof(newProof)

        blockchain.addBlock(newBlock)

        return newBlock
    }
}

export { GENESIS_ACCOUNT_ID, AMOUNT_OF_REWARD, IMiner, Miner }