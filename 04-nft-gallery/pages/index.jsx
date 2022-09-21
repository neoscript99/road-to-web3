import { useState } from 'react'
import { fetchNFTs, fetchNFTsForCollection } from '../service/nftService'
import { NFTCard } from "../components/nftCard"
import { useCallback } from 'react'

const Home = () => {
  const [wallet, setWalletAddress] = useState("vitalik.eth");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [fetchNFTsRes, setFetchNFTsRes] = useState({})
  const query = useCallback(async (e, begin) => {
    let nfts
    if (fetchForCollection) {
      nfts = await fetchNFTsForCollection(collection)
      setFetchNFTsRes({})
    }
    else {
      const res = await fetchNFTs(wallet, collection, !begin && fetchNFTsRes.pageKey);
      setFetchNFTsRes(res)
      nfts = res?.ownedNfts
    }
    setNFTs(nfts || [])
  }, [wallet, collection, fetchForCollection, fetchNFTsRes])

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input className='border-2' onChange={(e) => { setWalletAddress(e.target.value) }}
          disabled={fetchForCollection} value={wallet} type={"text"}
          placeholder="Add your wallet address"></input>
        <input className='border-2' onChange={(e) => { setCollectionAddress(e.target.value) }}
          value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 ">
          <input onChange={(e) => { setFetchForCollection(e.target.checked) }}
            type={"checkbox"} className="mr-2"></input>
          Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
          onClick={() => query(null, true)}>Let's go! </button>
      </div>
      {fetchNFTsRes.pageKey && <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
        onClick={query}>More(total: {fetchNFTsRes.totalCount})</button>}
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard key={`${nft.contract.address}-${nft.id.tokenId}`} nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home