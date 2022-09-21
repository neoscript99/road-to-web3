
const api_key = "UTzpL4SzUiuRah8-mm6VgJ5eflZj5qH-"
export const fetchNFTs = async (wallet, collection, pageKey) => {
    let nfts;

    console.log("fetching nfts");
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
    };
    if (!(wallet && wallet.length))
        return {};

    if (!collection.length) {

        const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${pageKey}`;

        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
        console.log("fetching nfts for collection owned by address")
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&pageKey=${pageKey}`;
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
        console.log("nfts:", nfts)
        return nfts
    }
    return {};
}
export const fetchNFTsForCollection = async (collection) => {
    if (collection && collection.length) {
        var requestOptions = {
            method: 'GET'
        };
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
        const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
        const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        if (nfts) {
            console.log("NFTs in collection:", nfts)
            return nfts.nfts
        }
    }
}
