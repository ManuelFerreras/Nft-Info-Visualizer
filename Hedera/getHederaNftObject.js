var fetch = require('node-fetch');

const apiBaseUrl = "https://mainnet-public.mirrornode.hedera.com/";

// Snippets

async function getTokenOwnerAndMintDateAndMetadata(tokenId, serial) {

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/${serial}`).then(res => res.json()).then(res => {
        if('_status' in res == false && res['metadata'] != "" && 'deleted' in res && res['deleted'] == false) {
            return {"account_id": res["account_id"], "created_timestamp": res["created_timestamp"], "metadata": res["metadata"]};
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Owner and Mint Date Check Error");
    });

}

async function getTokenInfo(tokenId) {

    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/`).then(res => res.json()).then(res => {
        if(res != {"_status":{"messages":[{"message":"Not found"}]}}) {
            return {"total_supply": res["total_supply"], "type": res["type"]};
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Token Info Check Error");
    });

}

async function getMetadataInfo(metaUrl) {
    return await fetch(metaUrl).then(res => res.json()).then(res => {
        if(res != {"_status":{"messages":[{"message":"Not found"}]}}) {
            console.log(res);

            let image;

            if('CID' in res) {
              if(res['CID'] != "") {
                image = res["CID"];
              }
            } else if('cid' in res) {
                if(res['cid'] != "") {
                    image = res["cid"];
                }
            } else if('image' in res) {
                if(res['image'] != "") {
                    image = res["image"];
                }
            } else {
                image = "";
            }
            

            return {"name": res["name"], "CID": image, "creator": res["creator"], "description": res["description"]};
        } else {
            return false;
        }
    })
}

async function getNftMinter(tokenId, serial) {
    return await fetch(apiBaseUrl + `api/v1/tokens/${tokenId}/nfts/${serial}/transactions`).then(res => res.json()).then(res => {
        if('transactions' in res) {
            return {"minter": res["transactions"][res["transactions"].length - 1]["receiver_account_id"]};
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Nft Minter Check Error");
    });
}

function timeConverter(UNIX_timestamp){ // From timestamp to STR date.
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + '/' + date + '/' + year + ' - ' + hour + ':' + min + ':' + sec ;
    console.log(time);
    return time;
}



async function getNftInfoByCollectionAndId(collectionAddress, id) {
    let nftName;
    let nftOwner;
    let nftMinter;
    let nftMintDate;
    let contractType = "Other";
    let metaImgAvailable;
    let nftMetadata
    let collection_size;
    let nftDescription;
    let obj;
    let data;


    data = await getTokenOwnerAndMintDateAndMetadata(collectionAddress, id).catch(console.log);
    nftMintDate = await timeConverter(data["created_timestamp"]);
    nftOwner = data["account_id"];
    nftMetadata = data["metadata"];

    data = await getTokenInfo(collectionAddress).catch(console.log);
    collection_size = data["total_supply"];
    contractType = data["type"];


    // Decodes de metadata CID.
    if(nftMetadata != undefined && nftMetadata != false && nftMetadata != "") {
        // create a buffer
        const buff = Buffer.from(nftMetadata, 'base64');

        // decode buffer as UTF-8
        let str = await buff.toString('utf-8');

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

        nftMetadata = `https://ipfs.io/ipfs/${str}` 
        console.log(nftMetadata);
    } 


    data = await getMetadataInfo(nftMetadata).catch(console.log);
    nftDescription = data["description"];
    nftName = data["name"];
    metaImgAvailable = data["CID"];

    data = await getNftMinter(collectionAddress, id).catch(console.log);
    nftMinter = data["minter"];




    obj = {
        "mediaType": "", // TODO in BackEnd
        "description": nftDescription, // Done
        "created_by": nftMinter, // Done
        "owner": [
            {
                "owner_name": nftOwner, // Done
                "purchase_date": "", // Done
                "purchase_value": "$0" // Done
            }
        ],
        "image_url": metaImgAvailable, // Done
        "collection_size": collection_size, // Done
        "edition_number": "", // Done
        "token_type": contractType == "NON_FUNGIBLE_UNIQUE"? "HIP-17 or Greater" : "Not Supported", // Done
        "mint_timestamp": nftMintDate, // Done
        "chain_id": 2, // Done
        "token_id": id, // Done
        "contract_address": collectionAddress, // Done
        "name": nftName, // Done
        "__v": 0, // Done
        "isGallery": true // Done
    }


    console.log(obj);
 
}

getNftInfoByCollectionAndId("0.0.914500", "19");