import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { signHardhat } from "./signatures";

inteface ISinher{
    _singTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>,
        value: Record<string,any>
    ):Promise<string>;
    getChaindId(): Promise<number>;
}

export async function signHardhat(chainId: number, verifyingContract:string ,data: IDefaultStructure){
    const chainId = await singer.grtChaindId();
    const{ domain, message, types} = buildDefaultStructure(chainId< verifyingContract, data);

    return singer._singTypedData(domain, types, message)
}


export async function singMetamask(singer: Wallet, verifyingContract: string, data: IDefaultStructure){
    const chainId = await singer.getChaindId();
    const params = buildDefaultStructureMetanmask(chainId, verifyingContract, data);
    const callParams = {
        privateKey: Buffer.from(singer.privateKey)
        data: params,
        version: SignTypedDataVersion.V4
    }
    return signTypedData(callParams);
}
