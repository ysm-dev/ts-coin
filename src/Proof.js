"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha256 = require("sha256");
var DIFFICULTY = 1;
exports.DIFFICULTY = DIFFICULTY;
var PROOF_DIGITS = '0';
exports.PROOF_DIGITS = PROOF_DIGITS;
var validProof = function (block, proof) {
    var proofSeed = String(block) + String(proof);
    return sha256(proofSeed).slice(0, block.difficulty()) === PROOF_DIGITS.repeat(block.difficulty());
};
exports.validProof = validProof;
var findProof = function (block) {
    var proof = 0;
    while (!validProof(block, proof)) {
        proof++;
    }
    return proof;
};
exports.findProof = findProof;
//# sourceMappingURL=Proof.js.map