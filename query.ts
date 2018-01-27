import { ITransaction, Transaction } from './src/Transaction';
import { blockchain, miner, node } from './index';

const addTransaction = (req, res): void => {
    const transaction: ITransaction = Transaction.initFromJSON(req.body)
    let nextIndex
    try {
        nextIndex = blockchain.addTransaction(transaction)
    } catch (e) {
        res.send({'message': String(e)})
    }
    res.send({'message': `Transaction will be added to [${nextIndex}]th block.`})
}

const getPendingTransactions = (req, res) => {
    res.send(JSON.stringify(blockchain.transactions.map(t => t.dump())))
}

const mine = (req, res) => {
    res.send(JSON.stringify({message: 'New Block is Mined!', block: miner.mine(blockchain).dump()}))
}

const getFullChain = (req, res) => {
    res.send(JSON.stringify({chain: blockchain.dump(), length: blockchain.length()}))
}

const getAllNodes = (req, res) => {
    res.send(JSON.stringify({nodes: [...Array.from(node.neighbor)], total: node.length()}))
}

const addNode = (req, res) => {
    node.add(req.hostname)
    res.send(JSON.stringify({message: 'New Node is Added!', total: node.length()}))
}

const validChain = (req, res) => {
    res.send(JSON.stringify({result: blockchain.valid()}))
}

// const consensus = (req, res) => {
// }


export {
    addTransaction,
    getPendingTransactions,
    mine,
    getFullChain,
    getAllNodes,
    addNode,
    validChain
}

