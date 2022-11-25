const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketPlace",async () => {
    let deployer,addr1,addr2,nft,marketplace
    let feepercent = 1
    let URI = "sample URI"
    beforeEach(async () => {
        const NFT = await ethers.getContractFactory("NFT");
        const MARKETPLACE = await ethers.getContractFactory("MarketPlace");
        // Get signers
        [deployer,addr1,addr2] = await ethers.getSigners();
        // Deploy Contracts
        nft = await NFT.deploy();
        marketplace = await MARKETPLACE.deploy(feepercent);
    })

    describe('Deployment', async() => {
        it("Should track name and symbol of the nft collection",async ()=>{
            expect(await nft.name()).to.equal("Genshi_ NFT")
            expect(await nft.symbol()).to.equal("Genshi_")
        })

        it("Should track feeAccount and feePercent of the marketplace",async ()=>{
            expect(await marketplace.feeAccount()).to.equal(deployer.address)
            expect(await marketplace.feePercent()).to.equal(feepercent)
        })
    })

    describe('Minting NFTs', () => {
        it("Should track each minted NFT",async () => {
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1)
            expect(await nft.balanceOf(addr1.address)).to.equal(1)
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2)
            expect(await nft.balanceOf(addr2.address)).to.equal(1)
            expect(await nft.tokenURI(2)).to.equal(URI);
        })
    })
})