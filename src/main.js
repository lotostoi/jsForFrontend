const SICRET_KEY = '991912ac966a68d2e79437171700dd01'
import * as artcilesModel from './articles';

 artcilesModel.all()
.then(articles => {
	console.log('articles count = ' + articles.length);
	let ind = Math.floor(Math.random() * articles.length);
	console.log('select index ' + ind + ', id = ' + articles[ind].id)

	return artcilesModel.one(articles[ind].id);
})
.then(article => {
	console.log(article);
})
.catch(console.warn) 

/* artcilesModel.add('a', 'b')
.then(article => {
	console.log(article);
})
.catch(console.warn) */