/* References

Definitions:

  - SC: Smart Contract

*/

// Modules
const fetch = require('node-fetch');
const toStream = require('it-to-stream');
const FileType = require('file-type');
const { create, globSource } = require('ipfs');
const CID = require('cids');
const path = require('path');
const download = require('image-downloader');
const sizeOf = require('image-size');
const fs = require('fs');
const getDimensions = require('get-video-dimensions');
const base32Decode = require('base32-decode')

const apiBaseUrl = "https://mainnet-public.mirrornode.hedera.com/";


// Snippets
async function downloadImage(url, filepath) {
    return await download.image({
       url,
       dest: filepath 
    });
}


async function checkMetadata(tokenId, serial) {

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/${serial}`).then(res => res.json()).then(res => {
        if('_status' in res == false && res['metadata'] != "" && 'deleted' in res && res['deleted'] == false) {
            return res;
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Metadata Check Error");
    });

}

async function getNftMetadata(url) {
    return await fetch(url).then(res => res.json()).then(res => {
        return res["metadata"];
    }).catch(() => {
        console.log("Metadata Check Error");
        return undefined;
    });
}

async function checkMetadataFields(metadataURL) {
    await fetch(metadataURL).then(res => res.json()).then(res => {
        if('CID' in res && res['CID'] != "" && 'external_url' in res && res['external_url'] != "" && 'description' in res && res['description'] != "" && 'name' in res && res['name'] && 'attributes' in res && res['attributes'] != [] && res['attributes'] != "") {
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


async function checkIfImageAvailable(metadataURL) {
    return await fetch(metadataURL).then(res => res.json()).then(res => {
        if('CID' in res) {
            if(res['CID'] != "") {
                return res["CID"];
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
        if('CID' in res) {
            if(res['CID'].includes("ipfs")) {
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
        if('CID' in res) {
            if(res['CID'] != undefined && res['CID'] != "" && res['CID'].startsWith("ipfs://ipfs/")) {
                return true;
            } else if(res['CID'] != undefined && res['CID'] != "" && res['CID'].startsWith("ipfs://")) {
                return true;
            } else if(res['CID'].toLowerCase().startsWith("https://")) {
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

        return web3.utils.hexToNumber(transfer[0]["gasUsed"]);
    }).catch(err => console.log("Nft Transfer Gas Spent Error: " + err));
}

async function getContractCreationGasSpent(collectionAddress) {
    return await api.account.txlist(collectionAddress, 0, 99999999,'asc')
    .then(json => {
        return json["result"][0]["gasUsed"];
    })
    .catch(err => console.log("Contract Creation Gas Spent Error: " + err)); 
}



async function getNftInfoByCollectionAndId(tokenId, serial) {
    // Local Variables
    let metaUrl;
    let metaImgAvailable;
    let metadataLatency;
    let mediaLatency;
    let type;
    let dimensions;
    let metaExt;
    let metaCID;

    let mintGas;
    let contractCreationGas;
    let transferGas;

    const dir = './jsipfs';
    // delete directory recursively
    try {
        await fs.rmdirSync(dir, { recursive: true });

        console.log(`${dir} was deleted!`);
    } catch (err) {
        console.log(`Error while trying to delete ${dir}.`);
    }


    // Just to measure analysis time.
    let analysisStartTime = Date.now();
    console.log("Analysis Start Time: " + analysisStartTime);


    // // Gas Spent a SC Creation.
    // contractCreationGas = await getContractCreationGasSpent(collectionAddress).catch(console.log);
    // console.log("Contract creation gas calculated.");
    

    // // Gas Spent on Nft Mint.
    // mintGas = await getTokenMintGasSpent(collectionAddress, id).catch(console.log);
    // console.log("Token mint gas calculated.");
    

    // // Gas Spent on Nft Transfer.
    // transferGas = await getTokenTransferGasSpent(collectionAddress, id).catch(console.log);
    // console.log("Token transfer gas calculated.");


    metaUrl = await checkMetadata(tokenId, serial).catch(console.log);
    console.log("Metadata Url get.");

    // Decodes de metadata CID.
    if(metaUrl != undefined && metaUrl != false && metaUrl != "") {
        // create a buffer
        const buff = Buffer.from(metaUrl["metadata"], 'base64');

        // decode buffer as UTF-8
        const str = buff.toString('utf-8');
        metaUrl = `https://ipfs.io/ipfs/${str}` 
    } 

    console.log("Nft Metadata Url get.");
    console.log(metaUrl);


    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {

        // Ping for metadata get request.
        var start = Date.now() / 1000;
        await checkMetadata(tokenId, serial).then(() => metadataLatency = Date.now() / 1000 - start);
        console.log("Metadata ping done.");
        

        // Checks if metadata follows the OpenSea metadata standard.
        metaFieldsStandard = await checkMetadataFields(metaUrl).catch(console.log); 
        console.log("Metadata fields checked.");
        
        
        // Checks if metadata is uploaded to IPFS.
        metaIPFS = await checkIfIPFSMetadata(metaUrl).catch(console.log);  
        console.log("Metadata in IPFS checked.");
        
        
        // Checks if metadata use SSL protocol.
        metaSSL = await checkUrlSSL(metaUrl).catch(console.log);
        console.log("Metadata SSL checked.");


        // Checks if metadata contains an image property.
        metaImgAvailable = await checkIfImageAvailable(metaUrl).catch(console.log);
        console.log("Metadata Image checked.");
        

        if (metaImgAvailable != false) {

            // Gets file extension if possible, from url.
            if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaExt = path.extname(metaImgAvailable);
                console.log("Metadata file extension checked.");
            }


            // Gets the metadata CID if possible, from img url.
            
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.endsWith(".ipfs.dweb.link/")) {
                metaCID = metaImgAvailable.split("/")[2].split(".")[0];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaCID = metaImgAvailable.split("/")[3];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaCID = metaImgAvailable.split("/")[2];
            }
            console.log("CID checked.");
            console.log(metaCID);


            // Converts image url to an https url if possible.
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://ipfs/").pop();
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://").pop();
            } 
            console.log("Mata Image Url get.");


            // In case it was not possible to get the metadata extension before, it gets it from ipfs api, if possible.
            if (metaExt == "" || metaExt == ".link") {
                await (async () => {
                  /*
                  const url =
                    'https://ipfs.io/ipfs/QmXwYpfRi5PG22U2opeouhSdhkbdCgSRKSWS2v2CqBUugV';
                  */
        
                  console.log("metaImgAvailable> ", metaImgAvailable);
        
                  const stream = got.stream(metaImgAvailable);
        
                  fileInfo = await fileTypeFromStream(stream);
        
                  console.log("type---->", fileInfo);
                })();
        
                console.log("Metadata field extension get.", fileInfo);
        
                mediaType = fileInfo?.ext;
              }
            console.log(type["ext"]);


            // Gets the size of the metadata image.
            await downloadImage(metaImgAvailable, `../../ERC721/temp/image${type["ext"]}`);
            console.log("Downloaded");

            try {
                getDimensions(`../../Hedera/temp/image${type["ext"]}`).then(function (dimension) {
                    console.log(dimension.width);
                    console.log(dimension.height);
                });
            } catch (err) {
                dimensions = sizeOf(`./temp/image${type["ext"]}`);
                console.log(dimensions);
            }

            
            console.log("Downloaded and checked image dimensions.");
            

            // Checks if the image is uploaded to ipfs.
            metaImgIPFS = await checkIfImageIsIPFS(metaUrl).catch(console.log);
            console.log("Meta image in IPFS checked.");


            // Checks if the image host uses SSL protocol.
            metaImgSSL = await checkIfImageIsSSL(metaUrl).catch(console.log);
            console.log("Meta image SSL checked.");


            // Pings the metadata image.
            start = Date.now() / 1000;
            await fetch(metaImgAvailable).then(() => mediaLatency = Date.now() / 1000 - start);
            console.log("Meta image ping calculated.");

        
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
    console.log('-------------------- Report Results --------------------\n');


    console.log(metaUrl != "" && metaUrl != undefined? "Metadata Available: A" : "Metadata Available: F");
    console.log(metaFieldsStandard? "OpenSea Metadata Standard: A" : "OpenSea Metadata Standard: F");
    console.log(metaIPFS? "Metadata on IPFS: A" : "Metadata on IPFS: F");
    console.log(metaSSL? "Metadata Storage Uses SSL: A" : "Metadata Storage Uses SSL: F");
    console.log(metaImgAvailable? "Asset Available: A" : "Asset Available: F");
    console.log(metaImgIPFS? "Asset on IPFS: A" : "Asset on IPFS: F");
    console.log(metaImgSSL? "Asset Uses SSL: A" : "Asset Uses SSL: F");

    // No MVP
    console.log("Media file format: " + type["ext"]);
    console.log("Image resolution: " + dimensions.width + "p x " + dimensions.height + "p");
    console.log(metadataLatency < 100? "Metadata Latency: A" : 'Metadata Latency: F');
    console.log(mediaLatency < 100? "Media Latency: A" : 'Media Latency: F');

    console.log("Gas spent on smart contract creation: " + contractCreationGas);
    console.log("Gas spent per mint: " + mintGas);
    console.log("Gas spent per transfer: " + transferGas);


    console.log("\n");
    console.log('--------------------------------------------------------');



    await console.log("Duration from Analysis: ", (Date.now() - analysisStartTime) / 1000);

    // delete directory recursively
    try {
        await fs.rmdirSync(dir, { recursive: true });

        console.log(`${dir} was deleted!`);
    } catch (err) {
        console.log(`Error while trying to delete ${dir}.`);
    }
    try {
        await fs.rmdirSync("./temp", { recursive: true });

        console.log(`${"./temp"} was deleted!`);
    } catch (err) {
        console.log(`Error while trying to delete ${"./temp"}.`);
    }

    process.exit(1);

}

getNftInfoByCollectionAndId("0.0.660478", "141");

