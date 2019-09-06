const express = require('express');

const server = express();

server.use(express.json())

// CRUD - Create, Read, Update, Delete

const users = ['Rafael', 'Diego', 'Cláudio'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd('Request');
})

function chekUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}
function chekUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exits' });
  }

  req.user = user;

  return next();
}

//Query
server.get('/testeQuery', (req, res) => {
  const nome = req.query.nome;
  return res.json(user)
})

//Listar todos usuários
server.get('/users', (req, res) => {
  return res.send({ users: users });
})

//Criar novo usuário
server.post('/users', chekUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

// Editar usuário
server.put('/users/:index', chekUserExists, chekUserInArray, (req, res) => {
  const { name } = req.body;

  const { index } = req.params;

  users[index] = name;

  return res.json(users);
})

//Deletar usuário
server.delete('/users/:index', chekUserInArray, (req, res) => {
  const index = req.params;

  users.splice(index, 1);

  return res.send()

})

//Params
server.get('/testeParams/:id', chekUserInArray, (req, res) => {
  const id = req.params.id;
  return res.send({ message: `Buscando o usuário ${id}` });
})

server.get('/users/:index', chekUserInArray, (req, res) => {
  return res.send(req.user);
})

server.listen(3333)