const pgp = require('pg-promise')()
const { join } = require('path') // Use 'path' em vez de 'node:path' para compatibilidade
const db = pgp('postgres://postgres:12345@localhost:5432/webmundi')

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
