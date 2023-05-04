import express from "express";
const app = express();

app.use(express.json());

let pessoas = [];

// Aqui estou fazendo a criação de um usuário, usando o método Math() para gerar ID aleatórios sem decimais
app.post("/cadastro", (req, res) => {
  const pessoa = req.body;

  pessoas.push({
    id: Math.floor(Math.random() * 5050),
    email: pessoa.email,
    senha: pessoa.senha,
    recado: (pessoa.recado = [
      {
        id: Math.floor(Math.random() * 5050),
        titulo: pessoa.titulo,
        descricao: pessoa.descricao,
      },
    ]),
  });

  console.log(pessoas);
  res.status(204).json(pessoas);
});


// Aqui usei put para poder registrar recados após login
app.put('/cadastro/:id', (req, res) => {
  const pessoa = req.body;
  const id = Number(req.params.id);
  const indexPessoa = pessoas.findIndex(pessoa=>pessoa.id === id);
  pessoas[indexPessoa] = {
    ...pessoas[indexPessoa], // mantém os dados originais da pessoa
    recado: [{
      id: Math.floor(Math.random() * 5050),
      titulo: pessoa.titulo,
      descricao: pessoa.descricao
    }]
  };
  console.log(pessoas);
  res.send('Pessoa atuliazada com sucesso')
})

app.get('/pessoas', (req, res)=>{
  const pessoasComRecados = pessoas.map(pessoa =>{
    return {
      ...pessoa,
      recado: pessoa.recado
    }
  });
  res.send(pessoasComRecados);
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8081, () => {
  console.log("Servidor Aberto");
});
