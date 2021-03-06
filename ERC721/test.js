const apiKey = "KXX4T9HFVXGFZ5ZV1B3MXXG7RSSKWRD3DC"
const api = require('etherscan-api').init(apiKey);
const Web3 = require("web3");
const ethNetwork = 'https://mainnet.infura.io/v3/d7f30da03a734567a801120b36cc7f6a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

let nftTxList = [];
let sumOfGas = 0;

async function main(collectionAddress, id) {

    await api.log.getLogs(collectionAddress, 0, 99999999, undefined, "AND", undefined, "AND", undefined, "AND", web3.utils.padLeft(web3.utils.numberToHex(id), 64))
    .then(json => {
        let txs = {};
        let totalFee = 0;

        for(const tx of json["result"]) {

            if(tx["transactionHash"] in txs == false) {
                txs[tx["transactionHash"]] = tx["transactionHash"];
                const used = web3.utils.hexToNumber(tx["gasUsed"]);
                const value = web3.utils.fromWei(web3.utils.hexToNumberString(tx["gasPrice"]));
                totalFee += value * used;
                
                nftTxList.push(tx);
                console.log(totalFee);
                sumOfGas += web3.utils.hexToNumber(tx["gasUsed"]);
            }

        }

    })
    .catch(err => console.log("Nft Txs Query Error: " + err))

    console.log(sumOfGas);

}

main("0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e", 9957);