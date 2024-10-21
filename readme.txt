como rodar o crud: 
1o: copie os arquivos para seu pc;
2o: tenha o postgres instalado
3o: crie uma database chamada "webmundi"(é a que foi usada na conexão)
4o: crie um novo package json por meio do comando npm init
5o: instale os seguintes módulos: npm i body-parser ejs express nodemon path pg-promise postgresql


jeito que a conexão é feita: const db = pgp('postgres://postgres:12345@localhost:5432/webmundi')
postgres: banco
12345: senha(a que vc colocar em casa)
@localhost:5432: (usuario e porta)
/webmundi: database generica