import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ox0d/mockDatabase',
  withCredentials: false,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  }
})

export default {
  getEvents: function () {
    return apiClient.get('/events')
  }
}
