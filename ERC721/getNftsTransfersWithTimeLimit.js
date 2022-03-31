var Web3 = require("web3");
var api = require('etherscan-api').init('KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC');
var fetch = require('node-fetch');
var ENS = require('ethereum-ens');

const ethNetwork = 'https://mainnet.infura.io/v3/d7f30da03a734567a801120b36cc7f6a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

var ens = new ENS(web3);


// Snippets
async function getLastTransferTimestamp(collectionAddress, tokenId) { // We filter the last transfer of the given Nft Id, from any address, and then we retrieve the tx timestamp.
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", undefined, "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.hexToNumber(json["result"][json["result"].length - 1 ]["timeStamp"]));
    }).catch(err => console.log("Nft Last Transfer Timestamp Error: " + err));
}

async function getNftOwner(contract, id) { // Query to Smart Contract Nft Ownership.
	return await contract.methods.ownerOf(id).call().then(res => { 
       return res;
    }).catch(err => console.log("Nft Owner Error: " + err));
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
    
   
    await getLastTransferTimestamp(collectionAddress, id).then(res => {
        nftLastTransferDate = timeConverter(res);
    });

    
 
}

getNftInfoByCollectionAndId("0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", 2067);