const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const db = require('./sql/connect') // A conexão com o banco já configurada

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))

app.set('view engine', 'ejs')

// Rota para renderizar o formulário
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// Rota para capturar dados do formulário e inserir no banco
app.post('/show', async (req, res) => {
  const { rua, cidade, estado, cep } = req.body

  try {
    // Inserir os dados no banco de dados
    const insertQuery =
      'INSERT INTO endereco (rua, cidade, estado, cep) VALUES ($1, $2, $3, $4)'
    await db.query(insertQuery, [rua, cidade, estado, cep])

    // Recuperar todos os dados após a inserção
    const selectQuery = 'SELECT * FROM endereco ORDER BY rua ASC'
    const result = await db.query(selectQuery)

    // Renderizar a página com os dados
    res.render('show.ejs', { endereco: result.rows }) // Passa os dados recuperados para a view
  } catch (err) {
    console.error('Erro ao salvar os dados:', err)
    res.status(500).send('Erro ao salvar no banco de dados')
  }
})

//ver os resjultados já existentes em show
app.get('/show', async (req, res) => {
  try {
    // Recuperar os dados do banco
    const selectQuery = 'SELECT * FROM endereco ORDER BY rua ASC'
    const result = await db.query(selectQuery)
    console.log(result)

    // Renderizar a página com os dados recuperados
    res.render('show.ejs', { endereco: result }) // Passa os dados para a view
  } catch (err) {
    console.error('Erro ao carregar os dados:', err)
    res.status(500).send('Erro ao carregar os dados do banco')
  }
})

app.delete('/endereco/:id', async (req, res) => {
  const enderecoId = parseInt(req.params.id)

  try {
    // Consulta SQL para excluir o endereço pelo ID
    const deleteQuery = 'DELETE FROM endereco WHERE id = $1'
    await db.query(deleteQuery, [enderecoId])

    res.status(200).json({ message: 'Endereço excluído com sucesso!' })
  } catch (err) {
    console.error('Erro ao excluir o endereço:', err)
    res.status(500).json({ message: 'Erro ao excluir o endereço' })
  }
})

// Rota para carregar o formulário de edição
app.get('/endereco/edit/:id', async (req, res) => {
  const enderecoId = req.params.id

  try {
    const result = await db.query('SELECT * FROM endereco WHERE id = $1', [
      enderecoId
    ])

    if (result.rows.length > 0) {
      res.render('edit.ejs', { endereco: result.rows[0] })
    } else {
      res.status(404).send('Endereço não encontrado')
    }
  } catch (err) {
    console.error('Erro ao carregar os dados do endereço para edição:', err)
    res.status(500).send('Erro ao carregar os dados')
  }
})

app.get('/endereco/edit/:id', async (req, res) => {
  const enderecoId = req.params.id

  try {
    const result = await db.query('SELECT * FROM endereco WHERE id = $1', [
      enderecoId
    ])
    console.log(result.rows) // Verifica o conteúdo dos dados retornados

    if (result.rows.length > 0) {
      res.render('edit.ejs', { endereco: result.rows[0] })
    } else {
      res.status(404).send('Endereço não encontrado')
    }
  } catch (err) {
    console.error('Erro ao carregar os dados do endereço para edição:', err)
    res.status(500).send('Erro ao carregar os dados')
  }
})

// Rota para processar a atualização do endereço
app.post('/endereco/update/:id', async (req, res) => {
  const enderecoId = req.params.id
  const { rua, cidade, estado, cep } = req.body

  try {
    // Atualiza o endereço no banco de dados
    const updateQuery = `
      UPDATE endereco 
      SET rua = $1, cidade = $2, estado = $3, cep = $4 
      WHERE id = $5
    `
    await db.query(updateQuery, [rua, cidade, estado, cep, enderecoId])

    res.redirect('/show') // Redireciona para a listagem de endereços após a atualização
  } catch (err) {
    console.error('Erro ao atualizar o endereço:', err)
    res.status(500).send('Erro ao atualizar o endereço')
  }
})

// Inicia o servidor na porta 5000
app.listen(5000, () => {
  console.log('O servidor está rodando na porta 5000')
})
