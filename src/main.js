import { wordsCount, getWords } from './functions'
let string =
  'Индекс, с которого          начинать поиск.                   Если индекс больше или равен           длине массива, возвращается         -1, что означает, что массив даже не просматривается. Если индекс является отрицательным числом, он трактуется как смещение с конца массива. Обратите внимание: если индекс отрицателен, массив всё равно просматривается от начала к концу. Если рассчитанный индекс                   оказывается меньше 0, поиск ведётся по всему массиву. Значение по умолчанию равно 0, что означает, что просматривается весь массив.'

for (let same of getWords(string)) {
  console.log(same.replace(',', '').replace('.', ''))
}
console.log('Исходная строка: ',getWords(string).oldValue) 
console.log('Преобразованная строка: ',getWords(string).newValue) 
console.log('Количество слов: ',wordsCount(string)) 