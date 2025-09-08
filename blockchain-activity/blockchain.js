// blockchain.js
// Mini blockchain with Proof-of-Work and validation.
// Run: node blockchain.js
const crypto = require('crypto');
/** A single block in the chain */
class Block {
    /**
    * @param {number} index
    * @param {string} timestamp - e.g., Date.now().toString()
    * @param {any} data - transaction payload (object or array)
    * @param {string} previousHash - hex string of prev block hash
    */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; // used for mining
        this.hash = this.calculateHash();
    }
    /** Compute SHA-256 over the block’s contents */
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                String(this.index) +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                String(this.nonce)
            )
            .digest('hex');
    }
    /** Proof-of-Work: find a hash starting with N leading zeros */
    mineBlock(difficulty) {
        /** Forces the difficulty of a hash to be minimum 3 */
        const min_difficulty = Math.max(3, difficulty);
        const target = '0'.repeat(min_difficulty);
        while (this.hash.substring(0, min_difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(` Block mined (idx=${this.index}): ${this.hash}`);
    }
}
/** A simple blockchain container */
class Blockchain {
    constructor(difficulty = 3) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }
    createGenesisBlock() {
        return new Block(0, Date.now().toString(), 'Genesis Block', '0');
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
    * Add a new block to the chain.
    * Sets its previousHash, mines it, then appends.
    */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    /** Verify integrity: hash consistency + correct previousHash links
    */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            // recompute hash from the block’s current contents
            if (current.hash !== current.calculateHash()) return false;
            // ensure link matches previous block’s actual hash
            if (current.previousHash !== previous.hash) return false;
            }
        return true;
    }
}
/* ---------------------- DEMO / WALKTHROUGH ---------------------- */
function main() {
    /**
    // 1) Create a chain
    const demoCoin = new Blockchain(3); // difficulty=3 is a good starter
    // 2) Add blocks with simple "transactions" (objects or arrays)
    console.log(' Mining block #1 ...');
    demoCoin.addBlock(new Block(1, Date.now().toString(), { from:
    'Alice', to: 'Bob', amount: 50 }));
    console.log(' Mining block #2 ...');
    demoCoin.addBlock(new Block(2, Date.now().toString(), { from:
    'Charlie', to: 'Dana', amount: 75 }));
    console.log(' Mining block #3 ...');
    demoCoin.addBlock(new Block(3, Date.now().toString(), [
        { from: 'Eve', to: 'Frank', amount: 20 },
        { from: 'Gina', to: 'Hank', amount: 10 },
    ]));
    // 3) Show the chain
    console.log('\n Full chain:');
    console.log(JSON.stringify(demoCoin, null, 2));
    // 4) Validate
    console.log('\n Is chain valid?', demoCoin.isChainValid());
    // 5) Tamper test: modify data in block #1 and re-validate
    console.log('\n Tampering with block #1 data ...');
    demoCoin.chain[1].data.amount = 9999;
    console.log(' Is chain valid after tamper?',
    demoCoin.isChainValid());
    */

    // My blockchain
    // 1) Create chain
    const rooCoin = new Blockchain(2) // set difficulty = 2 to test minimum difficulty setting
    // 2) Add blocks with transactions
    console.log(' Mining block #1 ...');
    rooCoin.addBlock(new Block(1, Date.now().toString(), { from:
    'Ian', to: 'Jessie', amount: 40 }));
    console.log(' Mining block #2 ...');
    rooCoin.addBlock(new Block(2, Date.now().toString(), [
        { from: 'Kelly', to: 'Lance', amount: 67 },
        { from: 'Monika', to: 'Natsuki', amount: 60 }
    ]));
    console.log(' Mining block #3 ...');
    rooCoin.addBlock(new Block(3, Date.now().toString(), [
        { from: 'Orion', to: 'Phoebe', amount: 80 },
        { from: 'Queen', to: 'Rolling Stones', amount: 120}
    ]));
    // 3) Show the chain
    console.log('\nFull chain:');
    console.log(JSON.stringify(rooCoin, null, 2));
    // 4) Validate
    console.log('\n Is chain valid?', rooCoin.isChainValid());
    // 5) Tamper with a block
    console.log('Tampering with Block #3 data...');
    rooCoin.chain[3].data[1].from = 'Keith';
    console.log(' Is chain valid after tamper?',
    rooCoin.isChainValid());
    
}
main()