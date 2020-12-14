export class Article {
  constructor({ id_article, id_user, title, content }) {
    this.id_article = id_article
    this.id_user = id_user
    this.title = title
    this.content = content
  }
  rander() {
    return `
        <div class="article">
            <div class="article__body">
                <h3>${this.title}</h3>
                <p>${this.content}</p>
            </div>
            <div class="article__delete" data-id="${this.id_article}">
                <i class="fa fa-trash" aria-hidden="true" data-id="${this.id_article}"></i>
            </div>
         </div>
      `
  }
}

export class Form {
  static hide = () => {
    document.querySelector('h3').style.display = 'flex'
    document.querySelector('h3').innerHTML = `Привет ${localStorage.getItem('userName')}`
    document.querySelector('form').style.display = 'none'
  }
  static show = () => {
    document.querySelector('h3').style.display = 'none'
    document.querySelector('form').style.display = 'flex'
  }
}

export function authTrue(accessToken, refreshToken) {
  accessToken && localStorage.setItem('accessToken', accessToken)
  refreshToken && localStorage.setItem('refreshToken', refreshToken)
  document.querySelector('form').style.display = 'none'
}
