var Web3 = require("web3");
var api = require('etherscan-api').init('KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC');
var fetch = require('node-fetch');
var ENS = require('ethereum-ens');

const ethNetwork = 'https://mainnet.infura.io/v3/d7f30da03a734567a801120b36cc7f6a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

var ens = new ENS(web3);

const ERC721Abi = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalMinted","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"changePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const ERC1155Abi = [{"inputs":[{"internalType":"string","name":"uri_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

// Snippets
async function getContractCreator(collectionAddress) {
    await api.account.txlist(collectionAddress, 0, 99999999,'asc')
    .then(json => {
        return(json["result"][0]["from"]);
    }); 
}

async function getTokenMintTimestamp(collectionAddress, tokenId) {
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", "0x0000000000000000000000000000000000000000000000000000000000000000", "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.hexToNumber(json["result"][0]["timeStamp"]));
    })
}

async function getLastTransferTimestamp(collectionAddress, tokenId) {
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", undefined, "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.hexToNumber(json["result"][json["result"].length - 1 ]["timeStamp"]));
    })
}

async function getTokensSupply(collectionAddress) { // TODO
    await api.account.txlist(collectionAddress, 1, 'latest', 1, 10000, 'asc')
    .then(json => {
         return(json["result"].length);
    })
}

async function getTokenMintAddress(collectionAddress, tokenId) {
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", "0x0000000000000000000000000000000000000000000000000000000000000000", "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return(web3.utils.toHex(web3.utils.hexToNumberString(json["result"][0]["topics"][2])));
    })
}

async function getTokenURI(contract, tokenId) {
	await contract.methods.tokenURI(tokenId).call().then(res => {
		console.log("IPFS Url: " + res);
		fetch(res).then(json => json.json()).then(output => {
		console.log("Nft Name: " + output["name"]);
		console.log("Nft Image: " + output["image"]);
		});
	});
}

async function checkIfOpenSource(collectionAddress) {
    return await api.contract.getabi(collectionAddress)
    .then(json => {
        if(json["status"] == 1) {
            return(true);
        }
    })
    .catch( () => {
        return(false);
    });

}

async function getNftOwner(contract, id) {
	return await contract.methods.ownerOf(id).call().then(res => { 
       console.log("Owner of Nft: " + res);
       return res;
    }).catch(err => console.log("Nft Owner Error: " + err));
}

async function checkIfComplies(contract) { // Returns an array: [ERC721Verification, ERC1155Verification] true: complies, false: does not comply
    return await contract.methods.supportsInterface("0x80ac58cd").call().then(async res => {
        if(!res) {
            return await contract.methods.supportsInterface("0xd9b67a26").call().then(res => {
                if(res) {
                    return [false, true];
                } else {
                    return [false, false];
                }
            });
        } else {
            return [true, false];
        }
    }).catch(() => {
        return [false, false];
    });
}

async function checkIfOptimized(collectionAddress) {
    return await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${collectionAddress}&apikey=KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC`).then(async res => {
        return res.json().then(res => {
            if(res["result"][0]["OptimizationUsed"] == 1) {
                return true;
            } else if (res["result"][0]["OptimizationUsed"] == 0) {
                return false;
            } else {
                console.log("Contract is Not Verified");
            }
        });
    });
}

async function checkENSName(address) {
    return await ens.reverse(address).name().then(res => {
        return res;
    }).catch(() => {
        return address;
    });
}

async function checkMetadata(contract, tokenId, type) {
    if (type) {
        return await contract.methods.tokenURI(tokenId).call().then(res => {
            if(res == "") {
                return "";
            } else {
                return(res);
            }
        }).catch(() => {
            console.log("Metadata ERROR: Non Existent Token Id");
        });
    } else if (!type) {
        return await contract.methods.uri(tokenId).call().then(res => {
            if(res == "") {
                return "";
            } else {
                return(res);
            }
        }).catch(() => {
            console.log("Metadata ERROR: Non Existent Token Id");
        });
    }   
}

async function checkMetadataFields(metadataURL) {
    await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res && res['image'] != "" && 'external_url' in res && res['external_url'] != "" && 'description' in res && res['description'] != "" && 'name' in res && res['name'] && 'attributes' in res && res['attributes'] != [] && res['attributes'] != "") {
            console.log("High Quality Metadata");
        } else {
            console.log("Incomplete Metadata");
        }
    }).catch(err => console.log("Meta Fields Error"));
}

async function checkIfIPFSMetadata(metadataURL) {
    if(metadataURL.includes("ipfs")) {
        console.log("Metadata Uploaded to IPFS.");
    } else {
        console.log("Metadata Not Uploaded to IPFS")
    }
}

async function checkUrlSSL(url) {
    if(url.toLowerCase().startsWith("https://")) {
        console.log("Metadata Uses SSL");
        return true;
    } else {
        console.log("Metadata Does not Use SSL");
        return false;
    }
}

async function checkIfAudited(contractAddress) {
    return await fetch(`https://etherscan.io/address/${contractAddress}#code`).then(async res => {
         return await res.text().then(res => {
            if(res.includes("No Contract Security Audit Submitted")) {
                return false;
            } else {
                return true;
            }
        });
    }).catch(err => console.log("Audit Error"));
}

async function checkIfImageAvailable(metadataURL) {
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res) {
            if(res['image'] != "") {
                console.log("Image is Available.")
                if(res['image'] != undefined && res['image'] != "" && res['image'].startsWith("ipfs://ipfs/")) {
                    res['image'] = "https://ipfs.io/ipfs/" + res['image'].split("ipfs://ipfs/").pop();
                } else if(res['image'] != undefined && res['image'] != "" && res['image'].startsWith("ipfs://")) {
                    res['image'] = "https://ipfs.io/ipfs/" + res['image'].split("ipfs://").pop();
                }
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

async function checkIfImageIsIPFS(metadataURL) {
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res) {
            if(res['image'].includes("ipfs")) {
                console.log("Image is on IPFS")
                return true;
            } else {
                console.log("Image is not on IPFS.")
                return false;
            }
        } else {
            console.log("Metadata Does Not Contain an Image For IPFS Check");
            return false;
        }
    }).catch(err => console.log("Image IPFS Error"));
}

async function getNftName(metadataURL) {
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

async function checkIfImageIsSSL(metadataURL) {
    return await fetch(metadataURL).then(async res => res.json()).then(async res => {
        if('image' in res) {
            if(res['image'].toLowerCase().startsWith("https://")) {
                console.log("Image Uses SSL");
                return true;
            } else {
                console.log("Image Does not Use SSL");
                return false;
            }
        } else {
            console.log("Metadata Does Not Contain an Image For SSL Check");
            return false;
        }
    }).catch(err => console.log("Image SSL Error"));
}

function timeConverter(UNIX_timestamp){
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
    let opensource;
    let erc721compliant;
    let erc1155compliant;
    let auditedContract;
    let optimizedContract;
    let nftName;
    let nftOwner;
    let nftMinter;
    let nftLastTransferDate;
    let nftMintDate;
    let contractType = "Other";
    let metaUrl;
    let metaFieldsStandard;
    let metaIPFS;
    let metaSSL;
    let metaImgAvailable;
    let metaImgIPFS;
    let metaImgSSL;
    let obj;

    const contract = new web3.eth.Contract(ERC721Abi, collectionAddress);
    const erc1155contract = new web3.eth.Contract(ERC1155Abi, collectionAddress);
    
    await checkIfOpenSource(collectionAddress).then(res => {
        opensource = res;

        if (res) {
            console.log('Open Source');
        } else {
            console.log('Not Open Source')
        }
    }); 

    await checkIfComplies(contract).then(res => {
        erc721compliant = res[0];
        erc1155compliant = res[1];

        console.log(erc721compliant? "Is ERC721" : erc1155compliant? "Is ERC1155" : "Does not match with any standard.");
    });

    await checkIfAudited(collectionAddress).then(res => {
        console.log(res? "Audited" : "Not Audited");
        auditedContract = res;
    });

    await checkIfOptimized(collectionAddress).then(res => {
        console.log(res? "Contract is Optimized" : "Contract is Not Verified");
        optimizedContract = res;
    });

    if(erc721compliant) {
        await checkMetadata(contract, id, true).then(res => metaUrl = res).catch(console.log);
    } else if (erc1155compliant) {
        await checkMetadata(erc1155contract, id, false).then(res => metaUrl = res).catch(console.log);
    }
    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://ipfs/")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://ipfs/").pop();
    } else if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://").pop();
    }

    console.log("Metadata: " + metaUrl);

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
    } else if (erc1155compliant) {
        contractType = "ERC-1155";
    } else {
        contractType = "Other";
    }

    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {
        await checkMetadataFields(metaUrl).then(res => metaFieldsStandard = res);
        await checkIfIPFSMetadata(metaUrl).then(res => metaIPFS = res);
        await checkUrlSSL(metaUrl).then(res => metaSSL = res);
        await checkIfImageAvailable(metaUrl).then(res => metaImgAvailable = res);

        if (metaImgAvailable != false) {
            await checkIfImageIsIPFS(metaUrl).then(res => metaImgIPFS = res);
            await checkIfImageIsSSL(metaUrl).then(res => metaImgSSL = res);
        } else {
            metaImgIPFS = false;
            metaImgSSL = false;
        }

        await getNftName(metaUrl).then(res => nftName = res);  
    }

    if(erc721compliant) {
        obj = {
            "nft": {
                "id": 1, // Done
                "name": nftName, // Done
                "created_by": nftMinter, // Done
                "contract_address": collectionAddress, // Done
                "token_id": id, // Done
                "chain_id": 1, // Done
                "mint_timestamp": nftMintDate, // Done
                "token_type": contractType, // Done
                "edition_name": 0, // Done
                "collection_size": 0, // Done
                "image_url": metaImgAvailable, // Done
                "owner": {
                    "owner_name": nftOwner, // Done
                    "last_transfer_date": nftLastTransferDate, // Done
                    "purchase_value": "$0" // Done
                }
            }
        }
    } else if(erc1155compliant) {
        obj = {
            "nft": {
                "id": 1, // Done
                "name": nftName, // Done
                "contract_address": collectionAddress, // Done
                "token_id": id, // Done
                "chain_id": 1, // Done
                "token_type": contractType, // Done
                "edition_name": 0, // Done
                "collection_size": 0, // Done
                "image_url": metaImgAvailable, // Done
            }
        }
    } else {
        obj = {}
    }

    console.log(obj);
 
}

getNftInfoByCollectionAndId("0xA6A5eC7b1B8A34Ff2dcb2926b7c78f52A5ce3b90", 1);