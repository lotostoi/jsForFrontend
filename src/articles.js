
import MakeRequest from "./wreppFetch"

const SICRET_KEY = '991912ac966a68d2e79437171700dd01'
const BASE_URL ='/js-hw-api/'

 
const http = new MakeRequest(BASE_URL, {
  headers: { 'Autorization': SICRET_KEY },
})

export const all = async() => http.get('articles.php') 
export const getById = async(id) => http.get(`articles.php?id=${id}`)
export const deleteById = async(id) =>  http.delete(`articles.php?id=${id}`)
export const add = async(article) => http.post('articles.php', article) 
export const change = async(article) => http.put('articles.php', article) 
