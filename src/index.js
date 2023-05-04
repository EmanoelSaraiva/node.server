import express from "express";
const app = express();

app.use(express.json());

let pessoas = [];

const requestLogin = (req, res, next) => {
  const { email, senha } = req.body;

  const validarEmail =  pessoas.find(p => p.email === email);
  if(!validarEmail){
      return res.status(406).json("Email não cadastrado");
  }
  const validarSenha =  pessoas.find(p => p.senha === senha);
  if(!validarSenha){
      return res.status(406).json("Senha não cadastrada");
  }
  next();
}

app.get('/login', requestLogin, (req, res) => {
  res.status(201).json("Logado com sucesso");
})

// Aqui estou fazendo a criação de um usuário, usando o método Math() para gerar ID aleatórios sem decimais
app.post("/cadastro", (req, res) => {
  const pessoa = req.body;

  const validarEmail =  pessoas.find(p => p.email === pessoa.email);
  if(validarEmail){
    return res.status(406).json("Email já cadastrado");
  }

  const vSenha = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{1,8}$/;
  if (!vSenha.test(req.body.senha)) {
    return res.status(406).json("Senha inválida");
  }


  pessoas.push({
    id: Math.floor(Math.random() * 5050),
    email: pessoa.email,
    senha: pessoa.senha,
    recado: pessoa.recado = [],
  });

  console.log(pessoas);
  res.status(204).json(pessoas);
});


// Aqui usei post para poder registrar recados após login
app.post('/cadastro/:id', (req, res) => {
  const pessoa = req.body;
  const id = Number(req.params.id);
  const indexPessoa = pessoas.findIndex(pessoa=>pessoa.id === id);

  // Valida se existe pessoa cadastrada
  if(indexPessoa === -1){
    return res.status(406).json("ID não cadastrado");
  }

  pessoas[indexPessoa].recado.push( {
    id: Math.floor(Math.random() * 5050),
    titulo: pessoa.titulo,
    descricao: pessoa.descricao
  })
  
  console.log(pessoas);
  res.send('Recado inserido com sucesso')
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
