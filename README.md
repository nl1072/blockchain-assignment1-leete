### Name: Nicholas Leete
### Email: nplmh5@umsystem.edu
### Course/Section: CS 476-0001

## Running the Program
1. Open the console
2. Enter `cd ~/blockchain-activity` and hit 'Enter'
3. Enter 'node blockchain.js` and hit 'Enter'

## Screenshots of output:
<img width="2560" height="1368" alt="image" src="https://github.com/user-attachments/assets/ca0c622d-55df-4c23-ae52-b382e299771a" />

<img width="2560" height="1368" alt="image" src="https://github.com/user-attachments/assets/aa075f2e-34e9-4c1e-bf9e-bdd88f83ed69" />

<img width="2560" height="1368" alt="image" src="https://github.com/user-attachments/assets/f83d2a7c-9c57-495d-a4ed-c6e98159c411" />

## Reflection:
The principle of using hashes to ensure immutability of a blockchain is simple. Each block contains a "proof of work" in the form of a hash value generated when the block is mined. Each block's hash value is generated based on the nonce value of the previous block. In order to alter the block, you would have to recompute the hash of said block, as well as the hashes of any blocks before it. This results in an exponential increaase in computational requirements as the length of the chain increases, making it impractical to alter. This is why proof-of-work makes blockchains so secure.
\nThe biggest surprise I had when coding this was its relative simplicity. The most complex parts of the implementation would probably be the math involved in the hash itself rather than anything in the design of the blockchain.
