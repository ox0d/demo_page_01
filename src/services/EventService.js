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
  getEvents: function (limit, perPage) {
    return apiClient.get('events?_limit=' + limit + '&_page=' + perPage)
  },
  getEvent: function (id) {
    return apiClient.get('/events/' + id)
  }
}
