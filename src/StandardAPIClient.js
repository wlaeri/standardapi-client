import axios from 'axios'
import qs from 'qs'
import invariant from 'invariant'

const defaultParams = {
  limit: 1000,
  offset: 0
}

const defaultCountParams = {
  select: {
    count: 'id'
  },
  distinct: true
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
    const { id } = params
    const queryString = params
      ? qs.stringify({ ...defaultParams, ...params, id: undefined })
      : qs.stringify(defaultParams)
    return this.__axios.get(`/${baseModel}/${ id ? `${id}/` : '' }?${queryString}`)
  }

  async count(baseModel, params){
    this.__handleBaseModelErrors(baseModel)
    const queryString = params
      ? qs.stringify({ ...params, ...defaultCountParams })
      : qs.stringify(defaultCountParams)
    const response = await this.__axios.get(`/${baseModel}/calculate/?${queryString}`)
    return {
      ...response,
      data: response.data[0]
    }
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
