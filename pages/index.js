import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import CryptoInfo from '../components/CryptoInfo'
import utilStyles from '../styles/utils.module.css'

import {
  getGasPrice,
  getBlockAverageTime
} from '../lib/interact'

import {
  getPairTradePrice,
  getToplistByPairVolume,
  getToplistByPairVolumeFull,
  getExchangeToplistByVolume,
} from '../lib/cryptocompare_api'

import {
  getAssets
} from '../lib/opensea-api'

export default function Home({
  gasPrice,
  avgBlockTime,
  tradePrices,
  toplistByPairVolume,
  toplistExchanges,
  toplistByPairVolumeFull,
  nftAsset
}) {
  return (
    <Layout home>
      <Head>
        <title>Crypto info</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Facts about current network state</p>
      </section>

      <CryptoInfo
        gasPrice={gasPrice}
        avgBlockTime={avgBlockTime}
        tradePrices={tradePrices}
        toplistByPairVolume={toplistByPairVolume}
        toplistExchanges={toplistExchanges}
        toplistByPairVolumeFull={toplistByPairVolumeFull}
        nftAsset={nftAsset}
      />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const gasPrice = await getGasPrice()
  const avgBlockTime = await getBlockAverageTime()
  const tradePrices = await getPairTradePrice()
  const toplistByPairVolume = await getToplistByPairVolume('BTC')
  const toplistByPairVolumeFull = await getToplistByPairVolumeFull('BTC')
  console.log(toplistByPairVolumeFull)
  const toplistExchanges = await getExchangeToplistByVolume('BTC', 'USDT')
  const nftAssets = await getAssets('0xc36442b4a4522e871399cd717abdd847ab11fe88', 32991)
  console.log(nftAssets)

  return {
    props: {
      gasPrice: gasPrice,
      avgBlockTime: avgBlockTime,
      tradePrices: tradePrices,
      toplistByPairVolume: toplistByPairVolume.slice(0, 20),
      toplistByPairVolumeFull: toplistByPairVolumeFull,
      toplistExchanges: toplistExchanges,
      nftAsset: nftAssets[0]
    }
  }
}
