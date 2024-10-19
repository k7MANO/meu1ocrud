const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sql/connect') // Conexão com o banco de dados
const path = require('path')
const show = express()

show.get('/', (req, res) => {
  res.render('index.ejs')
})

// Rota para capturar dados do formulário e inserir no banco
show.post('/show', async (req, res) => {
  const { rua, cidade, estado, cep } = req.body

  try {
    // Inserir os dados no banco de dados usando pg-promise
    const insertQuery = `
      INSERT INTO endereco (rua, cidade, estado, cep) 
      VALUES ($1, $2, $3, $4)
    `
    await db.none(insertQuery, [rua, cidade, estado, cep])

    // Recuperar todos os dados após a inserção
    const selectQuery = 'SELECT * FROM endereco ORDER BY rua ASC'
    const result = await db.any(selectQuery)

    // Renderizar a página com os dados
    res.render('show.ejs', { endereco: result }) // Passa os dados recuperados para a view
  } catch (err) {
    console.error('Erro ao salvar os dados:', err)
    res.status(500).send('Erro ao salvar no banco de dados')
  }
})

show.get('/show', async (req, res) => {
  try {
    // Recuperar os dados do banco usando pg-promise
    const selectQuery = 'SELECT * FROM endereco ORDER BY rua ASC'
    const result = await db.any(selectQuery) // `any` retorna todos os resultados como um array
    // Renderizar a página com os dados recuperados
    res.render('show.ejs', { endereco: result }) // Passa os dados diretamente para a view
  } catch (err) {
    console.error('Erro ao carregar os dados:', err)
    res.status(500).send('Erro ao carregar os dados do banco')
  }
})

module.exports = show
