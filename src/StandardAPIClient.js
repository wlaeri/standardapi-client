import axios from 'axios'
import qs from 'qs'

const defaultParams = {
  limit: 1000,
  offset: 0
}

class StandardAPIClient {
  constructor (params) {
    this.__axios = axios.create(params)
  }

  create(baseModel, payload) {
    return this.__axios.post(`/${baseModel}/`, payload)
  }

  read(baseModel, params){
    const queryString = qs.stringify({ ...defaultParams, ...params })
    return this.__axios.get(`/${baseModel}/?${queryString}`)
  }

  update(baseModel, payload){
    if (!payload.id) throw new Error('No ID specified in payload.')
    return this.__axios.patch(`/${baseModel}/${payload.id}/`, { ...payload, id: undefined })
  }

  destroy(baseModel, id){
    if (!id) throw new Error('No ID specified.')
    return this.__axios.delete(`/${baseModel}/${id}`)
  }
}

export default StandardAPIClient
