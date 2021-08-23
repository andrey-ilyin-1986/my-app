export default class AppService {

  maxId = 0

  data = [
    this.createItem('Left', [
      this.createItem('Left 1'),
      this.createItem('Left 2'),
      this.createItem('Left 3')
    ]),
    this.createItem('Middle', [
      this.createItem('Middle 1'),
      this.createItem('Middle 2'),
      this.createItem('Middle 3')
    ]),
    this.createItem('Right', [
      this.createItem('Right 1'),
      this.createItem('Right 2'),
      this.createItem('Right 3')
    ]),
  ]

  createItem(name, data = [])
  {
    return {id: this.maxId++, name, data}
  }

  getPages = () => new Promise(resolve => setTimeout(() => resolve(this.data), 1000))

}