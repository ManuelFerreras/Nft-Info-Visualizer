var Web3 = require("web3");
var api = require('etherscan-api').init('KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC');
var fetch = require('node-fetch');
var ENS = require('ethereum-ens');
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
const ERC1155Abi = [{"inputs":[{"internalType":"string","name":"uri_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

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

async function checkIfComplies(contract) { // Returns a bool.
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


async function getNftInfoByCollectionAndId(collectionAddress, id) {
    let erc721compliant;
    let auditedContract;
    let optimizedContract;
    let metaUrl;
    let metaImgAvailable;
    let sourceCode;
    let securityCounter = 0;
    let metadataLatency;
    let mediaLatency;
    let type;
    let dimensions;

    const contract = new web3.eth.Contract(ERC721Abi, collectionAddress);
    const isContract = await web3.eth.getCode(await contract.methods.owner().call());

    await getContractSourceCode(collectionAddress).then(res => {
        sourceCode = res;
    });

    SecurityLibraries.map(val => {
        sourceCode.includes(val)? securityCounter++ : securityCounter;
    });

    await checkIfComplies(contract).then(res => {
        erc721compliant = res;
    });

    await checkIfAudited(collectionAddress).then(res => {
        auditedContract = res;
    });

    await checkIfOptimized(collectionAddress).then(res => {
        optimizedContract = res;
    });

    if(erc721compliant) {
        await checkMetadata(contract, id).then(res => metaUrl = res).catch(console.log);
    }

    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://ipfs/")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://ipfs/").pop();
    } else if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("ipfs://")) {
        metaUrl = "https://ipfs.io/ipfs/" + metaUrl.split("ipfs://").pop();
    }

    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {

        var start = Date.now();
        await checkMetadata(contract, id).then(() => {
            metadataLatency = Date.now() - start;
        });
        
        await checkMetadataFields(metaUrl).then(res => metaFieldsStandard = res);  
        await checkIfIPFSMetadata(metaUrl).then(res => metaIPFS = res);    
        await checkUrlSSL(metaUrl).then(res => metaSSL = res);


        await checkIfImageAvailable(metaUrl).then(res => metaImgAvailable = res);
        
        if (metaImgAvailable != false) {
            let metaExt;

            if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaExt = path.extname(metaImgAvailable);
            }


            let metaCID;

            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaCID = metaImgAvailable.split("/")[3];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaCID = metaImgAvailable.split("/")[2];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaCID = metaImgAvailable.split("/").pop();
            }


            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://ipfs/").pop();
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://").pop();
            } 
            console.log(metaCID);
            metaCID = metaCID;


            const ipfs = await create();    


            const { cid } = await ipfs.add(metaCID);
            const providers = ipfs.dht.findProvs(cid, {"numProviders": 10000, "timeout": 10000000});

            console.log(providers);

            for await (const provider of providers) {
                if(provider['name'] == 'PROVIDER') {
                    console.log(provider)
                }
            }


            metaCID = new CID(metaCID);
            type = await FileType.fromStream(toStream(ipfs.cat(metaCID, {
                length: 100 // or however many bytes you need
            })));            

            await downloadImage(metaImgAvailable, "../../image.png");
            dimensions = sizeOf('../image.png');
            


            await checkIfImageIsIPFS(metaUrl).then(res => metaImgIPFS = res);
            await checkIfImageIsSSL(metaUrl).then(res => metaImgSSL = res);

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


    console.log('--------------------------------------------------------');


    // Delete temp image.
    try {
        fs.unlinkSync('../image.png')
    } catch(err) {
        console.error(err)
    }

    process.exit(1);

}

getNftInfoByCollectionAndId("0x7A676bE8344A282Be2cfCe69d172B11aC2FBd812", 1);


