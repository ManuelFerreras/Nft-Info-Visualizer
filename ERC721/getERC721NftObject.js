var Web3 = require("web3");
var api = require('etherscan-api').init('KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC');
var fetch = require('node-fetch');
var ENS = require('ethereum-ens');

const ethNetwork = 'https://mainnet.infura.io/v3/d7f30da03a734567a801120b36cc7f6a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

var ens = new ENS(web3);

const ERC721Abi = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalMinted","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"changePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Snippets
async function getTokenMintTimestamp(collectionAddress, tokenId) { // We filter the first transfer tx of the given Nft Id, from address(0), and then we retrieve the tx timestamp.
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", "0x0000000000000000000000000000000000000000000000000000000000000000", "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.hexToNumber(json["result"][0]["timeStamp"]));
    }).catch(err => console.log("Nft Mint Timestamp Error: " + err));
}

async function getLastTransferTimestamp(collectionAddress, tokenId) { // We filter the last transfer of the given Nft Id, from any address, and then we retrieve the tx timestamp.
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", undefined, "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.hexToNumber(json["result"][json["result"].length - 1 ]["timeStamp"]));
    }).catch(err => console.log("Nft Last Transfer Timestamp Error: " + err));
}

async function getTokenMintAddress(collectionAddress, tokenId) { // We filter the first transfer tx of the given Nft Id, from address(0), and then we retrieve the "to" field.
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", "0x0000000000000000000000000000000000000000000000000000000000000000", "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.toHex(web3.utils.hexToNumberString(json["result"][0]["topics"][2])));
    }).catch(err => console.log("Nft Minter Error: " + err));
}

async function getNftOwner(contract, id) { // Query to Smart Contract Nft Ownership.
	return await contract.methods.ownerOf(id).call().then(res => { 
       return res;
    }).catch(err => console.log("Nft Owner Error: " + err));
}

async function checkIfComplies(contract) { // Returns a bool. 
    return await contract.methods.supportsInterface("0x80ac58cd").call().then(async res => { // We check if this contract supports the ERC721 by using the ERC165 contract.
        if(!res) {
            return false;
        } else {
            return true;
        }
    }).catch(err => {
        console.log("Nft Standar Compliance Check Error: " + err)
        return false;
    });
}

async function checkENSName(address) { // Query to retrieve any domain associated to an address.
    return await ens.reverse(address).name().then(res => {
        return res;
    }).catch(() => {
        return address;
    });
}

async function checkMetadata(contract, tokenId) { // We get the Nft URI from the Smart Contract
    return await contract.methods.tokenURI(tokenId).call().then(res => { 
        return(res);
    }).catch(err => {
        console.log("Metadata Error: " + err);
    });
}

async function checkIfImageAvailable(metadataURL) { // We check that the image url is valid.
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res) {
            if(res['image'] != "") {
                console.log("Image is Available.")
                return res['image'];
            } else {
                console.log("Image is not Available.")
                return false;
            }
        } else {
            console.log("Metadata Does Not Contain an Image");
            return false;
        }
    }).catch(err => console.log("Image Availability Error"));
}

async function getNftName(metadataURL) { // Retrieve the Nft name from metadata.
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('name' in res) {
            console.log("Metadata Contains The NFT Name: " + res['name']);
            return res['name'];
        } else {
            console.log("Metadata Does Not Contain a Name")
            return "";
        }
    }).catch(err => console.log("Name Error"));
}

function timeConverter(UNIX_timestamp){ // From timestamp to STR date.
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + '/' + date + '/' + year + ' - ' + hour + ':' + min + ':' + sec ;
    return time;
}



async function getNftInfoByCollectionAndId(collectionAddress, id) {
    let erc721compliant;
    let nftName;
    let nftOwner;
    let nftMinter;
    let nftLastTransferDate;
    let nftMintDate;
    let contractType = "Other";
    let metaUrl;
    let metaImgAvailable;
    let obj;

    const contract = new web3.eth.Contract(ERC721Abi, collectionAddress);
    
    await checkIfComplies(contract).then(res => {
        erc721compliant = res;
    });

    if(erc721compliant) {
        await checkMetadata(contract, id, true).then(res => metaUrl = res).catch(console.log);
    } 

    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://ipfs/")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://ipfs/").pop();
    } else if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://").pop();
    }

    if(erc721compliant) {
        contractType = "ERC-721";
        await getNftOwner(contract, id).then(res => checkENSName(res).then(res => nftOwner = res));
        await getTokenMintAddress(collectionAddress, id).then(res => checkENSName(res).then(res => nftMinter = res));

        await getLastTransferTimestamp(collectionAddress, id).then(res => {
            nftLastTransferDate = timeConverter(res);
        });

        await getTokenMintTimestamp(collectionAddress, id).then(res => {
            nftMintDate = timeConverter(res);
        });
    } else {
        contractType = "Other";
    }

    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {
        await checkIfImageAvailable(metaUrl).then(res => metaImgAvailable = res);
        await getNftName(metaUrl).then(res => nftName = res);  
    }

    obj = {
        "nft": {
            "id": 1, 
            "name": nftName, 
            "created_by": nftMinter, 
            "contract_address": collectionAddress, 
            "token_id": id, 
            "chain_id": 1, 
            "mint_timestamp": nftMintDate, 
            "token_type": contractType, 
            "edition_name": 0, 
            "collection_size": 0, 
            "image_url": metaImgAvailable, 
            "owner": {
                "owner_name": nftOwner, 
                "last_transfer_date": nftLastTransferDate, 
                "purchase_value": "$0" 
            }
        }
    }

    console.log(obj);
 
}

getNftInfoByCollectionAndId("0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", 2067);