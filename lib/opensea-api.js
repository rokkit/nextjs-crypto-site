const axios = require('axios')
// const { OrderSide } = require('opensea-js/lib/types')

API_HOST = `https://testnets-api.opensea.io`

module.exports = {
  getSellOrders: async (owner) => {
    const url = `${API_HOST}/wyvern/v1/orders`;
    const params = {
      bundled: false,
      include_bundled: false,
      include_invalid: false,
      limit: 20,
      offset: 0,
      order_by: 'created_date',
      order_direction: 'desc',
      owner: owner,
      side: 1
    }
    const response = await axios.get(url, { params: params, headers: { 'X-API-KEY': '' } });
    return response.data.orders
  },
  getOrder: async (nft_contract_address, token_id) => {
    const url = `${API_HOST}/wyvern/v1/orders`;
    const params = {
      limit: 1,
      side: 1,
      token_id: token_id,
      asset_contract_address: nft_contract_address
    }
    const response = await axios.get(url, { params: params, headers: { 'X-API-KEY': '' } });
    return response.data.orders[0]
  },
  getCollections: async (asset_owner) => {
    const url = `${API_HOST}/api/v1/collections`;
    const { data } = await axios.get(url, {
      params: { asset_owner },
      headers: {
        'X-API-KEY': ''
      }
    })
    return data
  },
  getAssets: async (asset_contract_address, token_ids) => {
    const url = `${API_HOST}/api/v1/assets`;
    const { data } = await axios.get(url, {
      params: { asset_contract_address, token_ids },
      headers: {
        'X-API-KEY': ''
      }
    })
    return data.assets
  },
  getCollectionItems: async (token_ids, collection, asset_contract_address) => {
    console.log('getCollectionItems', token_ids, collection, asset_contract_address)
    const url = `${API_HOST}/api/v1/assets`;

    try {
      const resp = await axios.get(url, {
        params: {
          asset_contract_address,
          token_ids,
          collection
        },
        headers: {
          'X-API-KEY': ''
        }
      })
      return resp.data.assets
    } catch(e) {

    }
  },

  getEvents: async (asset_contract_address, token_id, collection_slug, limit) => {
    const url = `${API_HOST}/api/v1/events`;
    const resp = await axios.get(url, {
      params: {
        asset_contract_address,
        token_id,
        collection_slug,
        limit
      },
      headers: {
        'X-API-KEY': ''
      }
    });
    return resp.data.asset_events
  }
}