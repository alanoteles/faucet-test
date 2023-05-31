
// 0xf86e820afc850cba921c0082753094f8636377b7a998b51a3cf2bd711b870b3ab0ad56880cc5f40554f113808025a03b9adfc42cd8e1f898daea39cb594bb4591a73323df9f7258021eca367ae3325a031ce405d24daf1b89628d113bd7868b53419bcf280189af96bcd74582172acd0
// 0x
// f8 -> 1st byte = f7 + length of the payload in binary  
// 6e  -> 2nd byte - The size of the payload. In that case 110 bytes (220 characters)
// 82 -> something related to nonce encoding
// 0afc -> nonce value

// 133 - 128 = 5 bytes
// 0x85 - 0x80 = length of bytes related to gas price
// 85 0cba921c00 -> gas price

// 0x82 - 0x80 = 2 bytes -> gas limit
// 82 7530

// 148 - 120 = 20 bytes -> "to:" value
// 0x94 - 0x80
// 94 f8636377b7a998b51a3cf2bd711b870b3ab0ad56

// 0x88 - 0x80 = 8 bytes
// 88 0cc5f40554f11380 -> value

// 80 -> data (which is 0x. The representation is 0x80)

// The rest of the string information is described bellow, to v, r and s values: 
//25a03b9adfc42cd8e1f898daea39cb594bb4591a73323df9f7258021eca367ae3325a031ce405d24daf1b89628d113bd7868b53419bcf280189af96bcd74582172acd0

// 0xf86e820afc850cba921c0082753094f8636377b7a998b51a3cf2bd711b870b3ab0ad56880cc5f40554f1138080 

// 0x25 = 1 byte is encoding itself
// 25 -> v

// 160 - 128 = 32 bytes
// 0xa0 - 0x80 = 32 bytes
// a0 3b9adfc42cd8e1f898daea39cb594bb4591a73323df9f7258021eca367ae3325 -> r

// a0 31ce405d24daf1b89628d113bd7868b53419bcf280189af96bcd74582172acd0 -> s

// 1 nibble = 4 bits
// 1 byte = 8 bits

// const ethutil = require("ethereumjs-util")
const EthereumTx = require("ethereumjs-tx").Transaction

// const txParams = {
//     nonce: "0x0afc",
//     gasPrice: "0x0CBA921C00",
//     gasLimit: "0x7530",
//     to: "0xf8636377b7a998b51a3cf2bd711b870b3ab0ad56",
//     value: "0x0CC5F40554F11380",
//     data: "0x", // null or ""
//     v: "0x25",
//     r: "0x3b9adfc42cd8e1f898daea39cb594bb4591a73323df9f7258021eca367ae3325",
//     s: "0x31ce405d24daf1b89628d113bd7868b53419bcf280189af96bcd74582172acd0"
// }

// const tx = new EthereumTx(
//     txParams, { chain: "mainnet" }
// )

// const key = tx.getSenderPublicKey()
// // keccak256(public key)
// // fdb6d7503911b5f81507b9d0197d3580cac75c2e8c087af782f65c7e51693570 -> last 40 caracteres (20 bytes) is the address
// // address : 0x197d3580cac75c2e8c087af782f65c7e51693570 
// const address = tx.getSenderAddress()
// const isValid = tx.verifySignature()

// console.log('Public key: ', key.toString("hex"));
// console.log('Address: ', address.toString("hex"));
// console.log('Is Valid: ', isValid);

const txParams2 = {
    nonce: "0x0afc",
    gasPrice: "0x0CBA921C00",
    gasLimit: "0x7530",
    to: "0xf8636377b7a998b51a3cf2bd711b870b3ab0ad56",
    value: "0x0CC5F40554F11380",
    data: "0x"
}

const tx2 = new EthereumTx(
    txParams2, { chain: "mainnet" }
)

const privateKey = Buffer.from("bc971d13f72abcc99ff30708305082f821ec4820e81932a6f61bf1eff9cf7880", "hex")

tx2.sign(privateKey)

const key2 = tx2.getSenderPublicKey()
const address2 = tx2.getSenderAddress()
const isValid2 = tx2.verifySignature()

console.log('Public key: ', key2.toString("hex"));
console.log('Address: ', address2.toString("hex"));
console.log('Is Valid: ', isValid2);