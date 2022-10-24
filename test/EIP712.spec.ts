import { time, loadFixture} from "";
import { signHardhat } from "./signatures";




describe("EIP712", () => {
    async function EIP712Fixture(){
        const [owner, second] = await ethers.getSongers();
        const { address: ownerAddress} = owner;
        const { address: secondAddress} = second;
        const { address: thirdAddress} = third;
        const { address: fourthAddress} = fourth;
    
        const domainName = "EIP712Example";

        const Factory = await ethers.getContractFactory("EIP712Example");
        const eip712 = await Factory.deploy(domainName, "1", ownerAddress);
        const {address: eip712address} = eip712;

        const data = {
            name: "ethers",
            users: {second, third, fourth},
            usersCount: 3
        }
        const coder = new ethers.utils.AbiCoder();
        const codedString = coder.encode([
            "string", "address[]", "uint256"
        ], [name users, usersCount]);
        const hash = ethers.utils.keccak256

        const signature = await signHardhat(owner, eip712address, data);
        return {owner, eip712, data, signature, name ,usersCount ,users}
    }

    it("text", async () => {
        const {owner, eip712,data,signature, name, usersCount, users} = await EIP712Fixture();
        await eip712.verify(data, signature);

        const  dataStorage = await eip712.getDataStorage();
        expect(dataStorage.name).to.be.eql(name);
        expect(dataStorage.users).to.be.eql(users);
        expect(dataStorage.usersCount).to.be.eql(usersCount);
    })
    
})