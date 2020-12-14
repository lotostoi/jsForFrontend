import '../css/style.scss'
import server from './server'
import { Article, Form } from './addTools'
import { setTokens } from './tokens'
import 'font-awesome/scss/font-awesome.scss'
import '@babel/polyfill'


const SECRET_KEY = '991912ac966a68d2e79437171700dd01'

const articles = document.querySelector('.articles')

Form.hide()

window.onload = async () => {
  try {
    await server.get('auth/check.php')

    document.querySelector('body').addEventListener('click', async (e) => {
      e.preventDefault()

      if (e.target.id === 'getAll') {
        let allArticles = await server.get('articles.php')
        articles.innerHTML = ''
        allArticles.forEach((a) => {
          let article = new Article(a)
          articles.insertAdjacentHTML('beforeend', article.rander())
        })
      }

      // authorization
      if (e.target.id === 'auth') {
        let user = new FormData(document.querySelector('form'))
        let { res, accessToken } = await server.post('auth/login.php', user)
        if (res) {
          setTokens(accessToken)
          Form.hide()
        } else {
          throw new Error("Server's answer isn't correct...")
        }
      }
    })
  } catch (e) {
    console.log(e)
  }
}
