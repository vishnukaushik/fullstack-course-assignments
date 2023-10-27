import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = ()=>{
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newContact)=>{
    return axios.post(baseUrl, newContact).then(response => response.data)
}

const deleteContact = (id)=>{
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newContact)=>{
    return axios.put(`${baseUrl}/${id}`, newContact).then(response => response.data)
}

export default {getAll, create, deleteContact, update}