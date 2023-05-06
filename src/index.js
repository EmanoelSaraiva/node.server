import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

let pessoas = [];

const validaIdPessoa = (req, res, next) => {
  const id  = req.params.id;
  const pessoa = pessoas.findIndex((p) => p.id === Number(id));
 
  if (pessoa === -1) {
      return res.status(400).json("Pessoa não encontrada");
  } else{
    next();
  }

}

//Inicio do CRUD

app.post("/login", (req, res) => {
  const login = req.body
  const email = login.email;
  const senha = login.senha;

  const idPessoa = pessoas.find(p=> p.email === email);

  if(!idPessoa) {
      return res.status(401).json("Por favor, digite um id valido");
  }

  bcrypt.compare(senha, idPessoa.senha, function(err, result) {
    
      if(result){
          return res.status(202).json("Usuario logado");
      } else {
          return res.status(406).json("Usuario invalido");
      }
  });
});

// Aqui estou fazendo a criação de um usuário, usando o método Math() para gerar ID aleatórios sem decimais
app.post("/cadastro", (req, res) => {
  const pessoa = req.body;

  const saltRounds = 8;

  const validarEmail = pessoas.find((p) => p.email === pessoa.email);
  if (validarEmail) {
    return res.status(409).json("Email já cadastrado");
  }

  const vSenha = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{1,8}$/;
  if (!vSenha.test(req.body.senha)) {
    return res.status(406).json("Senha inválida");
  }

  bcrypt.hash(pessoa.senha, saltRounds, function (err, hash) {
    if (hash) {
      pessoas.push({
        id: Math.floor(Math.random() * 5050),
        email: pessoa.email,
        senha: hash,
        recado: (pessoa.recado = []),
      });
    } else {
      return err.status(406).json("Senha inválida" + err);
    }
  });

  res.status(201).json("Cadastrado com sucesso");
});

// Aqui registra recados após login
app.post("/cadastro/:id", validaIdPessoa,(req, res) => {
  const pessoa = req.body;
  const id = Number(req.params.id);
  const indexPessoa = pessoas.findIndex((pessoa) => pessoa.id === id);

  // Valida se existe pessoa cadastrada
  if (indexPessoa === -1) {
    return res.status(417).json("ID não cadastrado");
  }

  pessoas[indexPessoa].recado.push({
    idRecado: Math.floor(Math.random() * 5050),
    titulo: pessoa.titulo,
    descricao: pessoa.descricao,
  });

  res.status(201).json("Novo recado adicionado")
});

//listar pessoas
app.get("/pessoas", (req, res) => {
  const pessoasComRecados = pessoas.map((pessoa) => {
    return {
      ...pessoa   
    };
  });
  res.send(pessoasComRecados);
});

//listar recados
app.get("/pessoas/:id", validaIdPessoa, (req, res) => {
  const recadoDaPessoa = pessoas.map((pessoa) => {
    return {
      recado: pessoa.recado.map((recado) => {
        return {
        ...recado,
        };
      }),
    };
  })
  res.send(recadoDaPessoa); 
});

//Atualiza recado
app.put('/pessoas/:id/recados/:idRecado', validaIdPessoa, (req, res) => {
  const id = Number(req.params.id);
  const idRecado = Number(req.params.idRecado);
  const indexPessoa = pessoas.findIndex(p => p.id === id);
  
  // Valida se existe pessoa cadastrada
  if (indexPessoa === -1) {
    return res.status(404).json('Pessoa não encontrada');
  }
  
  const indexRecado = pessoas[indexPessoa].recado.findIndex(r => r.idRecado === idRecado);
  
  //Valida se existe recado cadastrado
  if (indexRecado === -1) {
    return res.status(404).json('Recado não encontrado');
  }

  const recado = req.body;

  pessoas[indexPessoa].recado[indexRecado] = {
    idRecado: recado.idRecado = idRecado,
    titulo: recado.titulo,
    descricao: recado.descricao,
  }

  return res.status(204).json("Recado atualizado");
})

//Deletar recados
app.delete('/pessoas/:idPessoa/recados/:idRecado', (req, res) => {
  const idPessoa = Number(req.params.idPessoa);
  const idRecado = Number(req.params.idRecado);
  const indexPessoa = pessoas.findIndex(p => p.id === idPessoa);
  
  // Valida se existe pessoa cadastrada
  if (indexPessoa === -1) {
    return res.status(404).json('Pessoa não encontrada');
  }

  const indexRecado = pessoas[indexPessoa].recado.findIndex(r => r.idRecado === idRecado);

  //Valida se existe recado cadastrado
  if (indexRecado === -1) {
    return res.status(404).json('Recado não encontrado');
  }

  pessoas[indexPessoa].recado.splice(indexRecado, 1);
  return res.status(205).send('Recado deletado');
});

app.listen(8081, () => {
  console.log("Servidor Aberto");
});
