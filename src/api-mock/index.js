import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockData = []

const mock = new MockAdapter(axios)
const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

mockData.forEach(d => {
  const params = [d.url]

  switch (d.method) {
    case 'GET': params.push({ params: d.params })
      break
    case 'PUT' || 'POST': params.push(d.body)
      break
  }

  mock[methodMap[d.method]](...params).reply(() => {
    const { url, method, response } = d
    console.log(`%c Request [${method}] ${url}: `, 'background: #fff; color: #000;', response)
    return [status || 200, response]
  })
})