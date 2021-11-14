import styles from './CryptoInfo.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CryptoInfo = ({
  gasPrice,
  avgBlockTime,
  tradePrices,
  toplistByPairVolume,
  toplistExchanges,
  toplistByPairVolumeFull,
  nftAsset }) => {
  return (
    <>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Mainnet info</h2>
        <ul className={utilStyles.list}>
          <li>Gas price: {gasPrice} gwei</li>
          <li>Average block time: {avgBlockTime} seconds</li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Trade info</h2>
        <ul className={utilStyles.list}>
          <li>ETH/USD: {tradePrices['USD']} USD</li>
          <li>ETH/RUB: {tradePrices['RUB']} RUB</li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top by 24h BTC Pair Volume</h2>
        <ul className={utilStyles.list}>
          {
            toplistByPairVolume.map((pair) => {
              return (
                <li key={pair['NAME']}>{pair['FULLNAME']}: {pair['VOLUME24HOURTO']}</li>
              )
            })
          }
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top by 24h Coin Info</h2>
        <ul className={utilStyles.list}>
          {
            toplistByPairVolumeFull.map((pair) => {
              return (
                <li key={pair['CoinInfo']['Id']}>
                  <img className={styles.coin_logo} src={`https://www.cryptocompare.com${pair['CoinInfo']['ImageUrl']}`} />
                  <div>{pair['CoinInfo']['FullName']}: Proof type {pair['CoinInfo']['ProofType']}</div>
                </li>
              )
            })
          }
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top Exchanges by 24h BTC/USDT Volume</h2>
        <ul className={utilStyles.list}>
          {
            toplistExchanges.map((exchange) => {
              return (
                <li key={exchange['exchange']}>{exchange['exchange']}: {exchange['volume24h']}</li>
              )
            })
          }
        </ul>
      </section>

      <section>
        <h2>NFT asset from <Link href={nftAsset.permalink}>OpenSea</Link></h2>
        <Image
          priority
          src={nftAsset.image_preview_url}
          height={290}
          width={500}
          alt={"NFT asset"}
        />
      </section>
    </>
  )
}

export default CryptoInfo