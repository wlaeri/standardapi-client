import axios from 'axios'
import qs from 'qs'

class StandardAPIClient {
  constructor (params) {
    this.__axios = axios.create(params)
  }

  create(baseModel, params) {
    const queryString = qs.stringify(params)
    return this.__axios.post(`/${baseModel}/?${queryString}`)
  }

  read(baseModel, params){
    const queryString = qs.stringify(params)
    return this.__axios.get(`/${baseModel}/?${queryString}`)
  }

  update(baseModel, params){
    const queryString = qs.stringify(params)
    return this.__axios.patch(`/${baseModel}/?${queryString}`)
  }

  destroy(baseModel, params){
    const queryString = qs.stringify(params)
    return this.__axios.delete(`/${baseModel}/?${queryString}`)
  }
}

export default StandardAPIClient
