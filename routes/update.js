const express = require('express')
const bodyParser = require('body-parser')
const db = require('../sql/connect') // Conexão com o banco de dados
const path = require('path')
const upd = express()

upd.get('/edit/:id', async (req, res) => {
  const id = parseInt(req.params.id) // Obtém o ID da URL

  try {
    const endereco = await db.one('SELECT * FROM endereco WHERE id = $1', [id])
    res.render('edit.ejs', { endereco }) // Passa o registro para a view
  } catch (error) {
    console.error('Erro ao buscar o registro:', error)
    res.status(404).send('Registro não encontrado')
  }
})

upd.post('/edit/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { rua, cidade, estado, cep } = req.body

  try {
    await db.none(
      'UPDATE endereco SET rua = $1, cidade = $2, estado = $3, cep = $4 WHERE id = $5',
      [rua, cidade, estado, cep, id]
    )
    console.log('Registro atualizado com sucesso no Banco de Dados')
    res.redirect('/show') // Redireciona após a atualização
  } catch (error) {
    console.error('Erro ao atualizar registro:', error)
    res.status(500).send('Erro ao atualizar o registro')
  }
})
module.exports = upd
