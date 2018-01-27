import * as uuid4 from 'uuid4'
import { Blockchain, IBlockchain } from './Blockchain';

interface INode {
    id: string
    neighbor: Set<string>

    add(address: string): void

    // consensusWithNeighbor(blockchain: IBlockchain): IBlockchain | undefined
}

class Node implements INode {
    id: string
    neighbor: Set<string>

    constructor(id?: string) {
        this.id = id ? id : Node.generateId()
        this.neighbor = new Set<string>()
    }

    add(address: string): void {
        this.neighbor.add(address)
    }

    length() {
        return this.neighbor.size
    }

    static generateId(): string {
        return String(uuid4()).replace('-', '')
    }

    static fetchNeighborChain(address: string) {
        return fetch(`${address}/chain`)
            .then(res => res.json())
            .then(data => data)
    }

    // consensusWithNeighbor(blockchain: IBlockchain): IBlockchain | undefined {
    //     let newBlockchain
    //     let maxLength = blockchain.length()
    //     this.neighbor.forEach(async (node) => {
    //         const data = await Node.fetchNeighborChain(node)
    //         if (data.length() > maxLength) {
    //             newBlockchain = new Blockchain(data.chain)
    //             if (newBlockchain.valid()) {
    //                 maxLength = newBlockchain.length()
    //             } else {
    //                 newBlockchain = undefined
    //             }
    //         }
    //     })
    // }
}

export { INode, Node }