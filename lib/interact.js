import Web3 from 'web3';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// const Web3HDWalletProvider = require("web3-hdwallet-provider");

const connectWithAlchemy = (network) => {
  const alchemyKeys = {
    'rinkeby': '',
    'mainnet': ''
  }
  return createAlchemyWeb3(alchemyKeys[network]);
}

export const getGasPrice = async () => {
  const web3 = connectWithAlchemy('mainnet')
  const result = await web3.eth.getGasPrice()
  return web3.utils.fromWei(result, 'gwei')
}

export const getBlockAverageTime = async () => {
  const web3 = connectWithAlchemy('mainnet')
  const nowBlockNumber = await web3.eth.getBlockNumber()
  const nb = await web3.eth.getBlock(nowBlockNumber)
  const thenBlock = await web3.eth.getBlock(nowBlockNumber - 500)
  return (nb.timestamp - thenBlock.timestamp) / 500.0
}