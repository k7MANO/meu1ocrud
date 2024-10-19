const pgp = require('pg-promise')()
const { join } = require('path')
const db = pgp('postgres://postgres:12345@localhost:5432/webmundi')

// Testa a conexão com uma consulta simples
db.connect()
  .then(obj => {
    console.log('Conexão bem-sucedida ao banco de dados!')
    obj.done() // Libera o recurso
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error.message || error)
  })

// Carregando o arquivo SQL
const filePath = join(__dirname, 'banco.sql')
const QueryFile = pgp.QueryFile
const query = new QueryFile(filePath, { minify: true })

// Verifica se houve erro ao carregar o arquivo SQL
if (query.error) {
  console.error('Erro ao carregar o arquivo SQL:', query.error)
} else {
  // Executa o SQL apenas se não houver erro
  db.any(query)
    .then(() => {
      console.log('Tabela ou consulta executada com sucesso!')
    })
    .catch(err => {
      console.error('Erro ao executar a query:', err)
    })
}

module.exports = db
