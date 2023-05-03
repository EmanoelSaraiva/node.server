import express from "express";

const app = express();

app.use(express.json());

let pessoas = [];

app.put("/cadastro", (req, res) => {
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

app.put('/cadastro/:id', (req, res) => {
  const pessoa = req.body;
  const id = Number(req.params.id);
  const indexPessoa = pessoas.findIndex(pessoa=>pessoa.id === id);
  pessoas[indexPessoa] = {
    id: id,
    email: email,
    senha: senha,
    recado: pessoa.recado = [{
      id: Math.floor(Math.random() * 5050),
      titulo: titulo,
      descricao: descricao
    }]
  }
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8081, () => {
  console.log("Servidor Aberto");
});
