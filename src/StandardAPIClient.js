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

  create(baseModel, body, params) {
    const queryString = qs.stringify({ ...defaultParams, ...params })
    return this.__axios.post(`/${baseModel}/?${queryString}`, body)
  }

  read(baseModel, params){
    const queryString = qs.stringify({ ...defaultParams, ...params })
    return this.__axios.get(`/${baseModel}/?${queryString}`)
  }

  update(baseModel, body, params){
    if (!body.id) throw new Error('No ID specified in body.')
    const queryString = qs.stringify({ ...defaultParams, ...params })
    return this.__axios.patch(`/${baseModel}/${body.id}/?${queryString}`, { ...body, id: undefined })
  }

  destroy(baseModel, body){
    if (!body.id) throw new Error('No ID specified in body.')
    return this.__axios.delete(`/${baseModel}/`, { id: body.id })
  }
}

export default StandardAPIClient
