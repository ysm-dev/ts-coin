import * as express from 'express'
import { addNode, addTransaction, getAllNodes, getFullChain, getPendingTransactions, mine, validChain } from './query'
import * as bodyParser from 'body-parser'
import { Node } from './src/Node';
import { Miner } from './src/Miner';
import { Blockchain } from './src/Blockchain';

const app = express()

app.use(bodyParser.json());
export const node = new Node()
export const miner = new Miner(node.id)
export const blockchain = new Blockchain()


app.post('/transaction', addTransaction)
app.get('/transaction', getPendingTransactions)
app.post('/mine', mine)
app.get('/chain', getFullChain)
app.get('/node', getAllNodes)
app.post('/node', addNode)
app.get('/chain/valid', validChain)


app.listen(3000, function () {
    console.log('Server Listening now in localhost:3000')
})
