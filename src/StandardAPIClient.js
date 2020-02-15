import axios from 'axios'
import qs from 'qs'
import invariant from 'invariant'

const defaultParams = {
  limit: 1000,
  offset: 0
}

class StandardAPIClient {
  constructor (params) {
    this.__axios = axios.create(params)
  }

  __handleBaseModelErrors(baseModel) {
    invariant(baseModel, `The "baseModel" parameter is required.`)
    invariant(typeof baseModel === "string", `The "baseModel" parameter must be a string.`)
  }

  __handlePayloadErrors(payload){
    invariant(payload, `The "payload" parameter is required.`)
    invariant(Object.keys(payload).length > 0, `The payload cannot be empty.`)
  }

  create(baseModel, payload) {
    this.__handleBaseModelErrors(baseModel)
    this.__handlePayloadErrors(payload)
    return this.__axios.post(`/${baseModel}/`, payload)
  }

  read(baseModel, params){
    this.__handleBaseModelErrors(baseModel)
    if (params.id) return this.__axios.get(`/${baseModel}/${params.id}`)
    const queryString = qs.stringify({ ...defaultParams, ...params })
    return this.__axios.get(`/${baseModel}/?${queryString}`)
  }

  update(baseModel, payload){
    this.__handleBaseModelErrors(baseModel)
    this.__handlePayloadErrors(payload)
    invariant(payload.id, `No ID specified in the payload.`)
    return this.__axios.patch(`/${baseModel}/${payload.id}/`, { ...payload, id: undefined })
  }

  destroy(baseModel, id){
    this.__handleBaseModelErrors(baseModel)
    invariant(id, `The "id" parameter is required.`)
    return this.__axios.delete(`/${baseModel}/${id}`)
  }
}

export default StandardAPIClient
