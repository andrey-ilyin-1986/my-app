export default class AppService {

  _apiBase = 'http://localhost:8000'

  getResource   = async url             => await fetch(`${this._apiBase}${url}`)

  putResource   = async ({ url, data }) => await fetch(`${this._apiBase}${url}`, {
    method:   'PUT',
    headers:  {'Content-Type': 'application/json'},
    body:     JSON.stringify(data),
  })

  getData       = ()                    => this.getResource(`/data/`)

  saveData      = data                  => this.putResource({ url: `/data/`, data })

}