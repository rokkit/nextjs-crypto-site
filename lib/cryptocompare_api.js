import axios from 'axios'

const API_KEY = ''

export const getPairTradePrice = async () => {
  const url = 'https://min-api.cryptocompare.com/data/price'
  const resp = await axios.get(url, {
    params: {
      fsym: 'ETH',
      tsyms: ['USD', 'RUB'].join(',')
    },
    headers: {
      authorization: `Apikey ${API_KEY}`
    }
  })
  return resp.data
}

export const getToplistByPairVolume = async (tsym) => {
  const url = 'https://min-api.cryptocompare.com/data/top/volumes'
  const resp = await axios.get(url, {
    params: {
      tsym: tsym
    },
    headers: {
      authorization: `Apikey ${API_KEY}`
    }
  })
  return resp.data['Data']
}

export const getToplistByPairVolumeFull = async (tsym) => {
  const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull'
  const resp = await axios.get(url, {
    params: {
      tsym: tsym
    },
    headers: {
      authorization: `Apikey ${API_KEY}`
    }
  })
  return resp.data['Data']
}

export const getExchangeToplistByVolume = async (fsym, tsym) => {
  const url = 'https://min-api.cryptocompare.com/data/top/exchanges'
  const resp = await axios.get(url, {
    params: {
      fsym: fsym,
      tsym: tsym
    },
    headers: {
      authorization: `Apikey ${API_KEY}`
    }
  })
  return resp.data['Data']
}