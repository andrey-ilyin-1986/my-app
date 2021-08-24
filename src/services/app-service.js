export default class AppService {

  _apiBase = 'http://localhost:8000'

  getResource = async url => (await fetch(`${this._apiBase}${url}`)).json()

  getPages = () => this.getResource(`/data/`)

}