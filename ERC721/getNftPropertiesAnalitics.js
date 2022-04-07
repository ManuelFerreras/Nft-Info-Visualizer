/* References

Definitions:

  - SC: Smart Contract

*/

// Modules
const Web3 = require("web3");
const api = require('etherscan-api').init('KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC');
const fetch = require('node-fetch');
const toStream = require('it-to-stream');
const FileType = require('file-type');
const { create, globSource } = require('ipfs');
const CID = require('cids');
const path = require('path');
const download = require('image-downloader');
const sizeOf = require('image-size');
const fs = require('fs');
const ethNetwork = 'https://mainnet.infura.io/v3/d7f30da03a734567a801120b36cc7f6a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));


// Info
const ERC721Abi = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalMinted","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"changePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const SecurityLibraries = ["contract ERC20", "interface IERC20", "library SafeERC20", "contract TokenTimelock", "interface IERC20Metadata", "abstract contract ERC20Wrapper", "abstract contract ERC20VotesComp", "abstract contract ERC20Votes", "abstract contract ERC20Snapshot", "abstract contract ERC20Pausable", "abstract contract ERC20FlashMint", "abstract contract ERC20Capped", "abstract contract ERC20Burnable", "interface IERC721Receiver", "interface IERC721", "contract ERC721", "contract ERC721Holder", "interface IERC721Metadata", "interface IERC721Enumerable", "abstract contract ERC721URIStorage", "abstract contract ERC721Royalty", "abstract contract ERC721Pausable", "abstract contract ERC721Enumerable", "abstract contract ERC721Burnable", "interface IERC1155Receiver", "interface IERC1155", "contract ERC1155", "abstract contract ERC1155Receiver", "contract ERC1155Holder", "interface IERC1155MetadataURI", "abstract contract ERC1155URIStorage", "abstract contract ERC1155Supply", "abstract contract ERC1155Pausable", "abstract contract ERC1155Burnable", "library Timers", "library Strings", "library StorageSlot", "abstract contract Multicall", "library Create2", "library Counters", "abstract contract Context", "library Checkpoints", "library Base64", "library Arrays", "library Address", "library EnumerableSet", "library EnumerableMap", "library DoubleEndedQueue", "library BitMaps", "library SignedSafeMath", "library SignedMath", "library SafeMath", "library SafeMath", "library Math", "interface IERC1820Registry", "interface IERC1820Implementer", "interface IERC165", "contract ERC1820Implementer", "abstract contract ERC165Storage", "library ERC165Checker", "abstract contract ERC165", "contract RefundEscrow", "contract Escrow", "abstract contract ConditionalEscrow", "abstract contract EIP712", "library SignatureChecker", "library MerkleProof", "library ECDSA", "abstract contract ReentrancyGuard", "abstract contract PullPayment", "abstract contract Pausable", "abstract contract Proxy", "library Clones", "abstract contract UUPSUpgradeable", "abstract contract Initializable", "contract TransparentUpgradeableProxy", "contract ProxyAdmin", "contract TransparentUpgradeableProxy", "contract ProxyAdmin", "contract UpgradeableBeacon", "interface IBeacon", "contract BeaconProxy", "abstract contract ERC1967Upgrade", "contract ERC1967Proxy", "contract MinimalForwarder", "abstract contract ERC2771Context", "contract TimelockController", "abstract contract IGovernor", "abstract contract Governor", "abstract contract Votes", "interface IVotes", "abstract contract IGovernorTimelock", "abstract contract GovernorVotesQuorumFraction", "abstract contract GovernorVotesComp", "abstract contract GovernorVotes", "abstract contract GovernorTimelockControl", "abstract contract GovernorTimelockCompound", "abstract contract GovernorSettings", "abstract contract GovernorProposalThreshold", "abstract contract GovernorPreventLateQuorum", "abstract contract GovernorCountingSimple", "abstract contract IGovernorCompatibilityBravo", "abstract contract GovernorCompatibilityBravo", "contract VestingWallet", "contract PaymentSplitter", "abstract contract CrossChainEnabled", "abstract contract CrossChainEnabledPolygonChild", "library LibOptimism", "abstract contract CrossChainEnabledOptimism", "library LibArbitrumL2", "library LibArbitrumL1", "abstract contract CrossChainEnabledArbitrumL2", "abstract contract CrossChainEnabledArbitrumL1", "library LibAMB", "contract CrossChainEnabledAMB", "abstract contract Ownable", "interface IAccessControlEnumerable", "interface IAccessControl", "abstract contract AccessControlEnumerable", "abstract contract AccessControlCrossChain", "abstract contract AccessControl"];

 
// Snippets
async function downloadImage(url, filepath) {
    return await download.image({
       url,
       dest: filepath 
    });
}

async function getContractSourceCode(collectionAddress) {
    return await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${collectionAddress}&apikey=KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC`).then(async res => {
        return await res.json().then(res => {
            return res["result"][0]["SourceCode"];
        });
    })
}

async function checkIfComplies(contract) {
    return await contract.methods.supportsInterface("0x80ac58cd").call().then(async res => {
        if(!res) {
           return false;
        } else {
            return true;
        }
    }).catch(() => {
        return false;
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
                return false;
            }
        });
    });
}

async function checkMetadata(contract, tokenId) {
    return await contract.methods.tokenURI(tokenId).call().then(res => {
        if(res == "") {
            return "";
        } else {
            return(res);
        }
    }).catch(() => {
        console.log("Metadata Check Error");
    });
}

async function checkMetadataFields(metadataURL) {
    await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res && res['image'] != "" && 'external_url' in res && res['external_url'] != "" && 'description' in res && res['description'] != "" && 'name' in res && res['name'] && 'attributes' in res && res['attributes'] != [] && res['attributes'] != "") {
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        return false;
    });
}

async function checkIfIPFSMetadata(metadataURL) {
    if(metadataURL.includes("ipfs")) {
        return true;
    } else {
        return false;
    }
}

async function checkUrlSSL(url) {
    if(url.toLowerCase().startsWith("https://")) {
        return true;
    } else {
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
    }).catch(err => console.log("Audit Check Error"));
}

async function checkIfImageAvailable(metadataURL) {
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res) {
            if(res['image'] != "") {
                return res["image"];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }).catch(err => console.log("Image Availability Check Error"));
}

async function checkIfImageIsIPFS(metadataURL) {
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('image' in res) {
            if(res['image'].includes("ipfs")) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Metadata Does Not Contain an Image For IPFS Check");
            return false;
        }
    }).catch(err => console.log("Image IPFS Error"));
}

async function checkIfImageIsSSL(metadataURL) {
    return await fetch(metadataURL).then(async res => res.json()).then(async res => {
        if('image' in res) {
            if(res['image'] != undefined && res['image'] != "" && res['image'].startsWith("ipfs://ipfs/")) {
                return true;
            } else if(res['image'] != undefined && res['image'] != "" && res['image'].startsWith("ipfs://")) {
                return true;
            } else if(res['image'].toLowerCase().startsWith("https://")) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Metadata Does Not Contain an Image For SSL Check");
            return false;
        }
    }).catch(err => console.log("Image SSL Error"));
}

async function getTokenMintGasSpent(collectionAddress, tokenId) { 
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", "0x0000000000000000000000000000000000000000000000000000000000000000", "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        return web3.utils.hexToNumber(json["result"][0]["gasUsed"]);
    }).catch(err => console.log("Nft Mint Gas Spent Error: " + err));
}

async function getTokenTransferGasSpent(collectionAddress, tokenId) { 
    return await api.log.getLogs(collectionAddress, 0, 99999999, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "AND", undefined, "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(tokenId), 64))
    .then(json => {
        
        // Check if any transfer from any address different to address(0) has been made.
        let transfer = json["result"].filter(obj => obj["topics"][1] != '0x0000000000000000000000000000000000000000000000000000000000000000');
        if (transfer.length == 0 && json["result"].length > 0) transfer = json["result"];

        return web3.utils.hexToNumber(transfer[transfer.length - 1]["gasUsed"]);
    }).catch(err => console.log("Nft Transfer Gas Spent Error: " + err));
}

async function getContractCreationGasSpent(collectionAddress) {
    return await api.account.txlist(collectionAddress, 0, 99999999,'asc')
    .then(json => {
        return json["result"][0]["gasUsed"];
    })
    .catch(err => console.log("Contract Creation Gas Spent Error: " + err)); 
}

async function checkLibraries(libraries, sourceCode) {
    let counter;

    libraries.map(val => {
        sourceCode.includes(val)? counter++ : counter;
    });
}

async function isMultiSig(contract) {

    let ownerAddress = await contract.methods.owner().call();
    return await web3.eth.getCode(ownerAddress);

}


async function getNftInfoByCollectionAndId(collectionAddress, id) {
    // Local Variables
    let erc721compliant;
    let auditedContract;
    let optimizedContract;
    let securityCounter = 0;

    let metaUrl;
    let metaImgAvailable;
    let metadataLatency;
    let mediaLatency;
    let type;
    let dimensions;
    let metaExt;
    let metaCID;

    let sourceCode;
    let contract;
    let isContract;
    
    let mintGas;
    let contractCreationGas;
    let transferGas;


    // Just to measure analysis time.
    let analysisStartTime = Date.now();


    // New contract instance.
    contract = new web3.eth.Contract(ERC721Abi, collectionAddress);


    // Checks if SC owner is a contract, used for multisig verification.
    isContract = await isMultiSig(contract).catch(console.log);


    // Gets SC source code.
    sourceCode = await getContractSourceCode(collectionAddress).catch(console.log);


    // Gets the amount of verified libraries this SC use.
    securityCounter = await checkLibraries(SecurityLibraries, sourceCode).catch(console.log);
    

    // Gas Spent a SC Creation.
    contractCreationGas = await getContractCreationGasSpent(collectionAddress).catch(console.log);
    

    // Gas Spent o Nft Mint.
    mintGas = await getTokenMintGasSpent(collectionAddress, id).catch(console.log);
    

    // Gas Spent o Nft Transfer.
    transferGas = await getTokenTransferGasSpent(collectionAddress, id).catch(console.log);


    // Checks if SC is ERC721.
    erc721compliant = await checkIfComplies(contract).catch(console.log);


    // Checks if SC is Audited.
    auditedContract = await checkIfAudited(collectionAddress).catch(console.log);


    // Checks if SC is optimized.
    optimizedContract = await checkIfOptimized(collectionAddress).catch(console.log);

    if(erc721compliant) {
        metaUrl = await checkMetadata(contract, id).catch(console.log);
    }


    // Checks if metadata url is from IPFS, and if it is, it creates an SSL url.
    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://ipfs/")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://ipfs/").pop();
    } else if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://").pop();
    }


    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {

        // Ping for metadata get request.
        var start = Date.now();
        await checkMetadata(contract, id).then(() => metadataLatency = Date.now() - start);
        

        // Checks if metadata follows the OpenSea metadata standard.
        metaFieldsStandard = await checkMetadataFields(metaUrl).catch(console.log); 
        
        
        // Checks if metadata is uploaded to IPFS.
        metaIPFS = await checkIfIPFSMetadata(metaUrl).catch(console.log);  
        
        
        // Checks if metadata use SSL protocol.
        metaSSL = await checkUrlSSL(metaUrl).catch(console.log);


        // Checks if metadata contains an image property.
        metaImgAvailable = await checkIfImageAvailable(metaUrl).catch(console.log);
        

        if (metaImgAvailable != false) {

            // Gets file extension if possible, from url.
            if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaExt = path.extname(metaImgAvailable);
            }


            // Gets the metadata CID if possible, from img url.
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaCID = metaImgAvailable.split("/")[3];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaCID = metaImgAvailable.split("/")[2];
            }


            // Converts image url to an https url if possible.
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://ipfs/").pop();
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://").pop();
            } 


            // In case it was not possible to get the metadata extension before, it gets it from ipfs api, if possible.
            if(metaExt == "") {
                const ipfs = await create();    
                metaCID = new CID(metaCID);
                type = await FileType.fromStream(toStream(ipfs.cat(metaCID, {
                    length: 100 // or however many bytes you need
                })));            
            }


            // Gets the size of the metadata image.
            await downloadImage(metaImgAvailable, "../../image.png");
            dimensions = sizeOf('../image.png');
            

            // Checks if the image is uploaded to ipfs.
            metaImgIPFS = await checkIfImageIsIPFS(metaUrl).catch(console.log);


            // Checks if the image host uses SSL protocol.
            metaImgSSL = await checkIfImageIsSSL(metaUrl).catch(console.log);


            // Pings the metadata image.
            start = Date.now();
            await fetch(metaImgAvailable).then(() => mediaLatency = Date.now());

        
        } else {
            metaImgIPFS = false;
            metaImgSSL = false;
        }

    } else {
        metaFieldsStandard = false;
        metaIPFS = false;
        metaSSL = false;
        metaImgAvailable = false;
        metaImgIPFS = false;
        metaImgSSL = false;
    }

    console.log('\n\n\n');
    console.log('-------------------- Report Results --------------------');


    console.log(sourceCode == undefined || sourceCode.length == 0? "Open Source: F" : 'Open Source: A');
    console.log(erc721compliant? "In Compliance With Token Standards: A" : "In Compliance With Token Standards: F");
    console.log(auditedContract? "Audit Available: A" : "Audit Available: F");
    console.log(optimizedContract? "Contract is Optimized: A" : "Contract is Optimized: B");
    console.log(metaUrl != "" && metaUrl != undefined? "Metadata Available: A" : "Metadata Available: F");
    console.log(metaFieldsStandard? "OpenSea Metadata Standard: A" : "OpenSea Metadata Standard: F");
    console.log(metaIPFS? "Metadata on IPFS: A" : "Metadata on IPFS: F");
    console.log(metaSSL? "Metadata Storage Uses SSL: A" : "Metadata Storage Uses SSL: F");
    console.log(metaImgAvailable? "Asset Available: A" : "Asset Available: F");
    console.log(metaImgIPFS? "Asset on IPFS: A" : "Asset on IPFS: F");
    console.log(metaImgSSL? "Asset Uses SSL: A" : "Asset Uses SSL: F");

    // No MVP
    console.log(securityCounter == 0? "Using well-established libraries: F" : securityCounter == 1? "Using well-established libraries: E" : securityCounter == 2? "Using well-established libraries: D" : securityCounter == 3? "Using well-established libraries: C" : securityCounter == 4? "Using well-established libraries: B" : "Using well-established libraries: A");
    console.log(isContract == "0x"? "Smart contract owner is multi-sig: F" : "Smart contract owner is multi-sig: A");
    console.log("Media file format: " + type["ext"]);
    console.log("Image resolution: " + dimensions.width + "p x " + dimensions.height + "p");
    console.log(metadataLatency < 100? "Metadata Latency: A" : 'Metadata Latency: F');
    console.log(mediaLatency < 100? "Media Latency: A" : 'Media Latency: F');

    console.log("Gas spent on smart contract creation: " + contractCreationGas);
    console.log("Gas spent per mint: " + mintGas);
    console.log("Gas spent per transfer: " + transferGas);


    console.log('--------------------------------------------------------');


    // Deletes temp image.
    try {
        fs.unlinkSync('../image.png')
    } catch(err) {
        console.error(err)
    }


    console.log("The execution time for this analysis was: " + Date.now() - analysisStartTime);


    process.exit(1);

}

getNftInfoByCollectionAndId("0x7A676bE8344A282Be2cfCe69d172B11aC2FBd812", 1);


