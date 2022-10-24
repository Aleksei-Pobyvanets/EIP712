import { MessageTypes, TypedMessage } from "@metamask/eth-sig-util";

const DefaultStructureType = [
    {name: "name", type: "string"},
    {name: "users", type: "address[]"},
    {name: "usersCount", type: "uint256"}
]

const EIP712DomainType = [
    {name: "name", type: "string"},
    {name: "version", type: "string"},
    {name: "chainId", type: "uint256"}, 
    {name: "verifyingContract", type: "address"}
]

interface IDefaultStructure {
    name: string,
    users: string[],
    usersCount: number;
}

export function buildDefaultStructure(chainId: number, verifyingContract: string, data:IDefaultStructure){
    const { name, users, usersCount} = data;
    return {
        domain:{
            name: "EIP712Example",
            version: "1",
            chainId,
            verifyingContract
        },
        messege: {
            name, users, usersCount
        },
        primaryType: "DefaultStructure",
        types:{
            DefaultStructure: DefaultStructureType
        }
    }
}

export function buildDefaultStructureMetanmask(chainId: number, verifyingContract: string, data:IDefaultStructure):TypedMessage<MessageTypes>{
    const signatureObject = buildDefaultStructure(chainId, verifyingContract, data);
    return {
        ...signatureObject,
        types:{
            ...signatureObject.types, EIP712Domain: EIP712DomainType
        }
    }
}
