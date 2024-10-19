const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const del = require('./routes/delete')
const upd = require('./routes/update')
const show = require('./routes/readEcreate')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views')))

app.set('view engine', 'ejs')

app.use([del, upd, show])

app.listen(5000, () => {
  console.log('O servidor está rodando na porta 5000')
})
