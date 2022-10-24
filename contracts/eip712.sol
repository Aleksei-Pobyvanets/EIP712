// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol"; 

contract EIP712Example is EIP712 {
    using ECDSA for bytes32;

    struct DefaultStructure {
        string name;
        address[] users;
        uint256 usersCount;
    }

    address private owner;
    DefaultStructure private dataStorage;

    bytes private DS_TYPEHASH = "DefaultStructure(string name, address[] users, uint256 usersCount)";

    constructor(string memory _name, string memory _version, address _owner) EIP712(_name, _version){
        owner = _owner;
    }

    function verifyDS(DefaultStructure calldata ds, bytes memory signature) external {
        bytes32 structHash = hashDS(ds);
        address recovered = ECDSA.recover(structHash, signature);
        require(owner == recovered, "Recovered is not owner");
        dataStorage = ds;
    }

    function hashDS(DefaultStructure calldata ds) public returns(bytes32){
        return keccak256(
                abi.encode(
                    DS_TYPEHASH,
                    keccak256(bytes(ds.name)),
                    abi.encodePacked(ds.users),
                    ds.usersCount
                )
            );
    }

}