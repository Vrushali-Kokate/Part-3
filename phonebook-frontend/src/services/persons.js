// import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'

// // Get all persons
// const getAll = () => {
//   return axios.get(baseUrl).then(response => response.data)
// }

// // Add a new person
// const create = (newPerson) => {
//   return axios.post(baseUrl, newPerson).then(response => response.data)
// }

// // Update an existing person (PUT)
// const update = (id, updatedPerson) => {
//   return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
// }

// // Delete a person
// const remove = (id) => {
//   return axios.delete(`${baseUrl}/${id}`)
// }

// export default { getAll, create, update, remove }

import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)

const remove = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

export default { getAll, create, remove }
