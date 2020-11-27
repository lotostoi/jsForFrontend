const SICRET_KEY = '991912ac966a68d2e79437171700dd01'
import '@babel/polyfill'
import http from './articles'

let art = new FormData()

art.append('id', '1')
art.append('title', 'Профисификация кода')
art.append('dt', '2018-12-06')
art.append('text', 'Код без промисов бывает жестью, но и с ними можно изобразить много странного.')

;(async () => {
  let add = await http.post('articles.php', art) 
  let articles = await http.get('articles.php')
  console.log('articles count = ' + articles.length)
  let ind = Math.floor(Math.random() * articles.length)
  console.log('select index ' + ind + ', id = ' + articles[ind].id)
  let article =  await http.get(`articles.php?id=${articles[ind].id}`)
  console.log(article)
  let del =  await http.delete(`articles.php?id=${article.id}`)
  console.log('что с удалением? - ' + del)

})()



