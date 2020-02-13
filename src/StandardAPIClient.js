import Axios from 'axios'
import qs from 'qs'

class StandardAPIClient extends Axios {
  create(baseModel, params) {
    const queryString = qs.stringify(params)
    return this.post(`/${baseModel}/?${queryString}`)
  }

  read(baseModel, params){
    const queryString = qs.stringify(params)
    return this.get(`/${baseModel}/?${queryString}`)
  }

  update(baseModel, params){
    const queryString = qs.stringify(params)
    return this.patch(`/${baseModel}/?${queryString}`)
  }

  destroy(baseModel, params){
    const queryString = qs.stringify(params)
    return this.delete(`/${baseModel}/?${queryString}`)
  }
}

export default StandardAPIClient
