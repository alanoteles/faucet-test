// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {

    mapping(uint => uint) public uu; // slot 0
    mapping(address => uint) public au; // slot 1

    uint[] public ui; // slot 2

    uint8 public a = 7; // 1 byte
    uint16 public b = 10; // 2 bytes
    address public c = 0xDb3a7cF77Db99aD796b1849453951616d2408F70; // 20 bytes
    bool d = true; // 1 byte
    uint64 public e = 15; // 8 bytes
    // 32 bytes, all values will be stored in slot 3

    uint256 public f = 200; // 32 bytes -> slot 4

    uint8 public g = 40; // 1 byte -> slot 5
    
    uint256 public h = 789; // 32 bytes -> slot 6
    
    constructor() {
        ui.push(1);
        ui.push(10);
        ui.push(100);

        uu[2] = 4;
        uu[3] = 10;

        au[0x33EeB0811AcFB7c170853C1800469613491097ae] = 100;
    }
}

// The address to memory storage of mappings is built by the keccak256 conversion of the map index + slot number
// 0x0000000000000000000000000000000000000000000000000000000000000002 -> index 2
// 0x0000000000000000000000000000000000000000000000000000000000000000 -> slot 0
// 00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000
// conversion hex value to keccak256 -> abbb5caa7dda850e60932de0934eb1f9d0f59695050f761dc64e443e5030a569

// To get the value of dynamic arrays stored, you need to follow hex(decimal(hex(keccak256(hex(slot))) + index) of the item
// 0x0000000000000000000000000000000000000000000000000000000000000002 -> slot 2
// hex(2) -> keccak256 to hex -> 405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace
// The result is a hex number. Now it mus be converted to decimal:
// decimal -> 29102676481673041902632991033461445430619272659676223336789171408008386403022
// decimal value + 1 -> 29102676481673041902632991033461445430619272659676223336789171408008386403023
// result to hex -> 405787FA12A823E0F2B7631CC41B3BA8828B3321CA811111FA75CD3AA3BB5ACF
// web3.eth.getStorageAt("0x9Af58b2686aE9D38ad00F820082d0d5b27110928", "405787FA12A823E0F2B7631CC41B3BA8828B3321CA811111FA75CD3AA3BB5ACF")
// This will return 0x0a, which is the hex value for 10 in decimal.