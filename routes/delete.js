const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sql/connect') // Conexão com o banco de dados
const path = require('path')
const del = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Rota DELETE para excluir o endereço pelo ID
del.delete('/endereco/:id', async (req, res) => {
  const enderecoId = parseInt(req.params.id)

  try {
    // Consulta SQL para excluir o endereço pelo ID
    const deleteQuery = 'DELETE FROM endereco WHERE id = $1'
    await db.none(deleteQuery, [enderecoId])

    res.status(200).json({ message: 'Endereço excluído com sucesso!' })
  } catch (err) {
    console.error('Erro ao excluir o endereço:', err)
    res.status(500).json({ message: 'Erro ao excluir o endereço' })
  }
})

// Exporte a instância `app`
module.exports = del
