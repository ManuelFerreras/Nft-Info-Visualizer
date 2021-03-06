/* References

Definitions:

  - SC: Smart Contract

*/

// Modules  
const fetch = require('node-fetch');
const sizeOf = require('image-size');
const fs = require('fs');
let accessKey = "6208ce19-a3d0-3a84-93a2-7d30705da51b";

const apiBaseUrl = "https://mainnet-public.mirrornode.hedera.com/";



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

async function checkMetadataHIP10Compliance(tokenId, serial) {

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/${serial}`).then(res => res.json()).then(res => {
        if('name' in res && 'description' in res && 'image' in res && 'localization' in res && 'decimals' in res && 'properties' in res && 'version' in res) {
            return true;
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Metadata HIP10 Compliance Check Error");
    });

}

async function checkMetadataCompliance(tokenId) {

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/`).then(res => res.json()).then(res => {
        if(JSON.stringify(res).startsWith('{"nfts":[],"links":{"next":null}}')) {
            return false;
        } else if ('nfts' in res) {
            return true;
        } else if (JSON.stringify(res).startsWith('{"_status":{"messages":[{"message":"No such token id -')) {
            return undefined;
        }
    }).catch(() => {
        console.log("Metadata Check Error");
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
        } else if('cid' in res) {
            if(res['cid'] != "") {
                return res["cid"];
            } else {
                return false;
            }
        } else if('image' in res) {
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


async function getNftTxList(tokenId, serial){

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/${serial}/transactions`).then(res => res.json()).then(res => {
        return res["transactions"];
    }).catch(() => {
        console.log("Nft Txs Query Error: " + err);
    });

}


async function getTxGas(txId) {

    return await fetch(apiBaseUrl + `api/v1/transactions/${txId}`).then(res => res.json()).then(res => {
        return (res["transactions"][0]["charged_tx_fee"]);
    }).catch((err) => {
        console.log("Nft Txs Query Error: " + err);
    });

}


async function getTokenPriceOnDay() {
    const date = new Date();
    const stringDate = date.getDate() + '-' + (date.getMonth() + 1 ) + '-' + date.getFullYear();
    console.log('Getting HBAR price on ' + stringDate);
    const url = 'https://api.coingecko.com/api/v3/coins/'
        + 'hedera-hashgraph'
        + '/history?date='
        + stringDate;

    return await fetch(url).then(res => res.json()).then(res => {
        return (res["market_data"]["current_price"]["usd"]);
    });
}


async function getTokenCreationTx(tokenId) {
    return await fetch(`https://api.dragonglass.me/hedera/api/transactions?contractID=${tokenId}`, { method: 'GET', headers: {"X-API-KEY": accessKey}}).then(res => res.json()).then(res => {
        return (res["data"][0]["transactionFee"]);
    });
}

async function getNftsAmount(tokenId) {
    return await fetch(`https://api.dragonglass.me/hedera/api/nfts?tokenId=${tokenId}`, { method: 'GET', headers: {"X-API-KEY": accessKey}}).then(res => res.json()).then(res => {
        return (res["size"]);
    });
}


async function getNftsTransferGas(tokenId) {
    return await fetch(`https://api.dragonglass.me/hedera/api/nfts/transfers?tokenId=${tokenId}&sortBy=desc`, { method: 'GET', headers: {"X-API-KEY": accessKey}}).then(res => res.json()).then(async res => {
        return await getTxGasDragonGlass(res["data"][0]["transactionId"]);
    });
}

async function getTxGasDragonGlass(txId) {
    return await fetch(`https://api.dragonglass.me/hedera/api/transactions/${txId}`, { method: 'GET', headers: {"X-API-KEY": accessKey}}).then(res => res.json()).then(async res => {
        return(res["data"][0]["transactionFee"]);
    });
}


async function getNftInfoByCollectionAndId(tokenId, serial) {
    // Local Variables
    
    let metaUrl;
    let metaImgAvailable;
    let metadataLatency;
    let mediaLatency;
    let dimensions;
    let metaCID;
    let metaHederaHIP17Compliance;
    let metaHederaHIP10Compliance = false;
    let accumulatedGas = 0;
    let usdUsed = 0;
    let totalTxs = 0;
    let totalEthTxs = 1;
    let totalEthGas = 0;
    let ethereumSCCreationAvg = 3450000;
    let transferGas = await getNftsTransferGas(tokenId);
    let mintGas = 0;

    let wattPerUSD = 370; // energy comsumed per USD spent on Hedera tx fee
    // this is based on Hedera's node statistics
    // (~$0.0001 average assumption) uses ~.037 W.
  
    let kgCO2PerWatt = 0.000233; // 1 kWh = 0.233 kg CO2
    // https://www.rensmart.com/Calculators/KWH-to-CO2

    let co2Used = 0;
    let ethereumCo2Simulation = 0;

    let hbarPrice = await getTokenPriceOnDay();
    console.log(hbarPrice);

    // Ethereum Gas Fees
    const fees = {
        "transfer": 65000, // Gas
        "mint": 150000 // Gas
    }

    const dir = './jsipfs';
    // delete directory recursively
    try {
        await fs.rmdirSync(dir, { recursive: true });

        console.log(`${dir} was deleted!`);
    } catch (err) {
        console.log(`Error while trying to delete ${dir}.`);
    }

    // Creates temp dir
    if (!fs.existsSync("./temp")){
        fs.mkdirSync("./temp");
    }


    // Just to measure analysis time.
    let analysisStartTime = Date.now();
    console.log("Analysis Start Time: " + analysisStartTime);


    let contractCreationGas = await getTokenCreationTx(tokenId).catch(console.log);
    let totalCollectionNfts = await getNftsAmount(tokenId).catch(console.log);
    accumulatedGas = Math.floor(contractCreationGas / totalCollectionNfts);
    console.log("Gas spent on SC Creation: " + contractCreationGas);
    console.log("Nfts Amount in Collection: " + totalCollectionNfts);
    console.log("Average mint added per nft: " + accumulatedGas);

    totalEthGas = Math.floor(ethereumSCCreationAvg / totalCollectionNfts);


    await getNftTxList(tokenId, serial)
    .then( async res => {
        totalTxs = res.length;

        if (totalTxs > 0) {
            for(const tx of res) {
                accumulatedGas = accumulatedGas + await getTxGas(tx["transaction_id"]);

                if(tx["type"] == "TOKENMINT") {
                    mintGas = await getTxGas(tx["transaction_id"]);
                    totalEthTxs += 1;
                    totalEthGas += fees["mint"];
                } else if (tx["type"] == "CRYPTOTRANSFER") {
                    totalEthGas += fees["transfer"];
                    totalEthTxs += 1;
                }
            }

            usdUsed = accumulatedGas / 100000000 * hbarPrice;
            ethereumCo2Simulation = totalEthGas * 0.0001809589427;
            co2Used = usdUsed * wattPerUSD * kgCO2PerWatt;
        }
    })
    console.log("Gas Impact Calculated.")


    metaUrl = await checkMetadata(tokenId, serial).catch(console.log);
    console.log("Metadata Url get.");
    console.log(metaUrl);

    // Checks if metadata follows the HIP17 or greater standard.
    metaHederaHIP17Compliance = await checkMetadataCompliance(tokenId); 
    console.log("Metadata compliance checked.");

    if(metaHederaHIP17Compliance) {
        metaHederaHIP10Compliance = await checkMetadataHIP10Compliance(tokenId, serial);
    }

    // Decodes de metadata CID.
    if(metaUrl != undefined && metaUrl != false && metaUrl != "") {
        // create a buffer
        const buff = Buffer.from(metaUrl["metadata"], 'base64');

        // decode buffer as UTF-8
        let str = buff.toString('utf-8');


        if(str != undefined && str != "" && str.endsWith(".ipfs.dweb.link/")) {
            str = str.split("/")[2].split(".")[0];
        } else if(str != undefined && str != "" && str.startsWith("ipfs://ipfs/")) {
            str = str.split("/")[3];
        } else if(str != undefined && str != "" && str.startsWith("ipfs://")) {
            str = str.split("/")[2];
        } else if(str != undefined && str != "" && str.startsWith("ipfs:/")) {
            str = str.split("/")[2];
        } else if(str != undefined && str != "") {
            str = str;
        }

        metaUrl = `https://ipfs.io/ipfs/${str}` 
    } 

    console.log("Nft Metadata Url get.");
    console.log(metaUrl);


    if(metaUrl != undefined && metaUrl != "" && metaUrl.startsWith("http")) {

        // Ping for metadata get request.
        var start = Date.now() / 1000;
        await checkMetadata(tokenId, serial).then(() => metadataLatency = Date.now() / 1000 - start);
        console.log("Metadata ping done.");

        
        // Checks if metadata is uploaded to IPFS.
        metaIPFS = await checkIfIPFSMetadata(metaUrl).catch(console.log);  
        console.log("Metadata in IPFS checked.");
        
        
        // Checks if metadata use SSL protocol.
        metaSSL = await checkUrlSSL(metaUrl).catch(console.log);
        console.log("Metadata SSL checked.");


        // Checks if metadata contains an image property.
        metaImgAvailable = await checkIfImageAvailable(metaUrl).catch(console.log);
        console.log("Metadata Image checked.");
        console.log(metaImgAvailable);
        

        if (metaImgAvailable != false) {

            // Gets the metadata CID if possible, from img url.
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.endsWith(".ipfs.dweb.link/")) {
                metaCID = metaImgAvailable.split("/")[2].split(".")[0];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaCID = metaImgAvailable.split("/")[3];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaCID = metaImgAvailable.split("/")[2];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs:/")) {
                metaCID = metaImgAvailable.split("/")[2];
            } else if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaCID = metaImgAvailable;
            }
            console.log("CID checked.");
            console.log(metaCID);


            // Converts image url to an https url if possible.
            if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://ipfs/")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://ipfs/").pop();
            } else if(metaImgAvailable != undefined && metaImgAvailable != "" && metaImgAvailable.startsWith("ipfs://")) {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable.split("ipfs://").pop();
            } else if(metaImgAvailable != undefined && metaImgAvailable != "") {
                metaImgAvailable = "https://ipfs.io/ipfs/" + metaImgAvailable;
            } 
            console.log("Mata Image Url get.");
            

            // Checks if the image is uploaded to ipfs.
            metaImgIPFS = await checkIfImageIsIPFS(metaUrl).catch(console.log);
            console.log("Meta image in IPFS checked.");


            // Checks if the image host uses SSL protocol.
            metaImgSSL = await checkIfImageIsSSL(metaUrl).catch(console.log);
            console.log("Meta image SSL checked.");


            console.log(metaImgAvailable);
            // Pings the metadata image.
            start = Date.now() / 1000;
            await fetch(metaImgAvailable).then(() => mediaLatency = Date.now() / 1000 - start);
            console.log("Meta image ping calculated.");

        
        } else {
            metaImgIPFS = false;
            metaImgSSL = false;
        }

    } else {
        metaIPFS = false;
        metaSSL = false;
        metaImgAvailable = false;
        metaImgIPFS = false;
        metaImgSSL = false;
    }

    console.log('\n\n\n');
    console.log('-------------------- Report Results --------------------\n');


    console.log('Open Source: Unsupported');
    console.log("In Compliance With Token Standards: Unsupported");
    console.log("Audit Available: Unsupported");
    console.log("Contract is Optimized: Unsupported");
    console.log("Using well-established libraries: Unsupported");
    console.log("Smart contract owner is multi-sig: Unsupported");
    console.log("OpenSea Metadata Standard: Unsupported\n\n");


    console.log(metaUrl != "" && metaUrl != undefined? "Metadata Available: A" : "Metadata Available: F");
    console.log(metaIPFS? "Metadata on IPFS: A" : "Metadata on IPFS: F");
    console.log(metaSSL? "Metadata Storage Uses SSL: A" : "Metadata Storage Uses SSL: F");
    console.log(metaImgAvailable? "Asset Available: A" : "Asset Available: F");
    console.log(metaImgIPFS? "Asset on IPFS: A" : "Asset on IPFS: F");
    console.log(metaImgSSL? "Asset Uses SSL: A" : "Asset Uses SSL: F");
    console.log(metaHederaHIP17Compliance == false? "In Compliance with Token Standard HIP-17 and greater: F" : metaHederaHIP17Compliance == true? "In Compliance with Token Standard HIP-17 and greater: A" : "In Compliance with Token Standard HIP-17 and greater: Invalid Token Id");
    console.log(metaHederaHIP10Compliance == false? "In Compliance with Metadata Standard HIP-10: F" : "In Compliance with Metadata Standard HIP-10: A");
    
    console.log(metadataLatency < 100? "Metadata Latency: A" : 'Metadata Latency: F');
    console.log(mediaLatency < 100? "Media Latency: A" : 'Media Latency: F');


    console.log("\n\nGas spent on smart contract creation: " + contractCreationGas);
    console.log("Gas spent per mint: " + mintGas);
    console.log("Gas spent per transfer: " + transferGas);


    console.log("\n\nTotal gas Used: " + accumulatedGas);
    console.log("Total Transactions: " + totalTxs);
    console.log("Total CO2 Used: " + co2Used + " Kgs");

    console.log("\n\Ethereum Aprox. Equivalent CO2 Used: " + ethereumCo2Simulation + " Kgs");
    console.log("\n\nTotal gas Used: " + totalEthGas);
    console.log("Total Transactions: " + totalEthTxs);


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

getNftInfoByCollectionAndId("0.0.914500", "19");
