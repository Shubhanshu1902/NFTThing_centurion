const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = num => ethers.utils.parseEther(num.toString());
const fromWei = num => ethers.utils.formatEther(num);

describe("NFTMarketPlace", async () => {
    let deployer, addr1, addr2, nft, marketplace;
    let feepercent = 1;
    let URI = "sample URI";
    beforeEach(async () => {
        const NFT = await ethers.getContractFactory("NFT");
        const MARKETPLACE = await ethers.getContractFactory("MarketPlace");
        // Get signers
        [deployer, addr1, addr2] = await ethers.getSigners();
        // Deploy Contracts
        nft = await NFT.deploy();
        marketplace = await MARKETPLACE.deploy(feepercent);
    });

    describe("Deployment", async () => {
        it("Should track name and symbol of the nft collection", async () => {
            expect(await nft.name()).to.equal("Genshi_ NFT");
            expect(await nft.symbol()).to.equal("Genshi_");
        });

        it("Should track feeAccount and feePercent of the marketplace", async () => {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feepercent);
        });
    });

    describe("Minting NFTs", () => {
        it("Should track each minted NFT", async () => {
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI);
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr2.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        });
    });

    describe("Making Marketplace items", () => {
        beforeEach(async () => {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI);
            // addr1 approves marketplace to sell nft
            await nft
                .connect(addr1)
                .setApprovalForAll(marketplace.address, true);
        });

        it("Should track newly created item,transfer NFT from seller to markteplace and emit offered item", async () => {
            await expect(
                marketplace.connect(addr1).createItem(nft.address, 1, toWei(1))
            )
                .to.emit(marketplace, "Offered")
                .withArgs(1, nft.address, 1, toWei(1), addr1.address);

            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);
            // Get item from items mapping then check fields to ensure they are correct
            const item = await marketplace.items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.tokenId).to.equal(1);
            expect(item.price).to.equal(toWei(1));
            expect(item.sold).to.equal(false);
        });

        it("Should fail if price is set to zero", async function () {
            await expect(
                marketplace.connect(addr1).createItem(nft.address, 1, 0)
            ).to.be.revertedWith("Price must be greater than 0");
        });
    });
});
