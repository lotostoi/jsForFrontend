import * as ArticlesModel from './articles'

(async () => {
  try {
    let { data } = await ArticlesModel.all()
    console.log('articles count = ' + data.length)
    let ind = Math.floor(Math.random() * data.length)
    console.log('select index ' + ind + ', id = ' + data[ind].id)
    let a = await ArticlesModel.one(data[ind].id)
    console.log(a)
    let res = await ArticlesModel.remove(a.id)
    console.log('что с удалением? - ' + res)
  } catch (e) {
    console.error("You have next error:", e)
  }
})()


/* Или так *******************************************************************/
/* ArticlesModel.all().then(( {data} ) => {
    console.log('articles count = ' + data.length)
    let ind = Math.floor(Math.random() * data.length)
    console.log('select index ' + ind + ', id = ' + data[ind].id) 
    return ArticlesModel.one(data[ind].id)
  })
  .then((data) => {
    console.log(data)
    return ArticlesModel.remove(data.id)
  })
  .then((data) => {
	console.log('что с удалением? - ' + data); 
  })
 .catch((err) => console.log('error:', err))  */
