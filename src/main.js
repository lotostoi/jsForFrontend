const SICRET_KEY = '991912ac966a68d2e79437171700dd01'
import '@babel/polyfill'
import * as http from './articles'

let art = new FormData()
art.append('title', 'Профисификация кода')
art.append(
  'content',
  'Код без промисов бывает жестью, но и с ними можно изобразить много странного.'
)
;(async () => {
  try {
    let add = await http.add(art)
    console.log('Результат добваления статьи: ', add)

    let articles = await http.all()
    console.log('Результат результат получения всех статей: ', articles)
    console.log('articles count = ' + articles.length)
    let ind = Math.floor(Math.random() * articles.length)

    console.log('select index ' + ind + ', id = ' + articles[ind].id)

    let article = await http.getById(articles[ind].id)
    console.log(
      `Результат результат получения статьи  c id: ${articles[ind].id}: `,
      article
    )

    let edit = await http.change({
      id: article.id,
      title: 'test',
      content: 'test',
    })
    console.log(
      `Результат результат изменения статьи  c id: ${articles[ind].id}: `,
      edit
    )

    article = await http.getById(article.id)
    console.log(
      `Результат получения измененой статьи  c id: ${articles[ind].id} : `,
      article
    )

    let del = await http.deleteById(article.id)
    console.log(`Результат результат удаления статьи c id: ` + del)

   let error_add = await http.add({})
   console.log(`Результат добавления статьи с неверным форматом: `, error_add)
    
  } catch (e) {
    console.log(e)
  }
})()
