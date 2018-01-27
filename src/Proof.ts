import * as sha256 from 'sha256'
import { IBlock } from './Block';

const DIFFICULTY: number = 1
const PROOF_DIGITS: string = '0'

const validProof = (block: IBlock, proof?: number): boolean => {
    const proofSeed = String(block) + String(proof)
    return sha256(proofSeed).slice(0, block.difficulty()) === PROOF_DIGITS.repeat(block.difficulty())
}

const findProof = (block: IBlock): number => {
    let proof = 0
    while (!validProof(block, proof)) {
        proof++
    }
    return proof
}

export { DIFFICULTY, PROOF_DIGITS, validProof, findProof }
