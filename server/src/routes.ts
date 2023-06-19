import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import {
    ReferenciaFuncionarios,
    ReferenciaAlunos,
    NConfirmadosFuncionarios, //confirmação de email
    NConfirmadosAlunos,
    AlunosAtivos,
    FuncionariosAtivos,
    Cardapio
} from '../db/models';
const bcrypt = require('bcrypt');

const apiRouter = Router();

const gerarCodigo = customAlphabet('0123456789', 6);

async function hashPassword(pass:string){
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass;
}

async function checkPassword(pass:string, hashedPass:string){
    const match = await bcrypt.compare(pass, hashedPass);
    return match;
}

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    console.log("Recebido")
    res.json({
        "message":"API funcionando"
    })
});

//Checar se o aluno está ativo
apiRouter.post("/check/aluno", async(req, res)=>{
    const rm = req.body.rm;
    try{
        const buscaRef = await ReferenciaAlunos.findAll({where:{rm:rm}});
        if(!buscaRef[0]) return res.json({msg: "Não temos registro desse RM"});

        const buscaAtivos = await AlunosAtivos.findAll({where:{rm:rm}});
        if(buscaAtivos[0]) return res.json({msg: "O aluno com esse RM já está cadastrado"});

        return res.json(res.statusCode)
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        })
    }
});

//Cadastro de Aluno
apiRouter.post("/cadastro/aluno", async(req, res)=>{
    
    const rm = req.body.rm;
    const senha = req.body.senha;
    const img = req.body.img;

    const hashedPass = await hashPassword(senha);

    const buscaRef = await ReferenciaAlunos.findAll({where:{rm:rm}});

    try{
        const alunoNovo = await AlunosAtivos.create({
            rm: buscaRef[0].rm,
            email: buscaRef[0].email,
            nome: buscaRef[0].nome,
            rg: buscaRef[0].rg,
            turma: buscaRef[0].turma,
            fotoPerfil: img,
            senha: hashedPass
        });
        return res.json({
            criado: alunoNovo
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }

});

//Checar se o funcionário está ativo
apiRouter.post('/check/funcionario', async(req, res)=>{
    const email = req.body.email;

    try{
        const buscaRef = await ReferenciaFuncionarios.findAll({where:{email:email}});
        if(!buscaRef[0]) return res.json({msg: "Esse funcionário não está registrado"});

        const buscaAtivos = await FuncionariosAtivos.findAll({where:{email:email}});
        if(buscaAtivos[0]) return res.json({msg: "Esse funcionário já está cadastrado"});

        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err)
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Cadastro de Funcionário
apiRouter.post('/cadastro/funcionario', async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
    const img = req.body.img;

    const hashedPass = await hashPassword(senha);

    const buscaRef = await ReferenciaFuncionarios.findAll({where:{email:email}});

    try{
        const funcNovo = await FuncionariosAtivos.create({
            email: buscaRef[0].email,
            nome: buscaRef[0].nome,
            fotoPerfil: img,
            senha: hashedPass
        });

        return res.json({
            criado: funcNovo
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Login de Aluno
apiRouter.post('/login/aluno', async(req, res)=>{
    const rm = req.body.rm;
    const senha = req.body.senha;

    try{
        const buscaAtivos = await AlunosAtivos.findAll({where:{rm:rm}});
        if(!buscaAtivos[0]) return res.json({msg: "Este aluno nao está cadastrado ainda"});
        if(await checkPassword(senha, buscaAtivos[0].senha)) return res.json(buscaAtivos[0]);
        return res.json({msg: "A senha está incorreta"});
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Login de funcionário
apiRouter.post('/login/funcionario', async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    try{
        const buscaAtivos = await FuncionariosAtivos.findAll({where:{email:email}});
        if(!buscaAtivos[0]) return res.json({msg: "Este funcionário não está cadastrado ainda"});
        if(await checkPassword(senha, buscaAtivos[0].senha)) return res.json(buscaAtivos[0]);
        return res.json({msg: "A senha está incorreta"})
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta do cardápio
apiRouter.get('/cardapio', async(req, res)=>{
    try{
        const cardapio = await Cardapio.findAll({attributes:['content1', 'content2', 'abertura', 'fechamento', 'cancelado']});
        res.json(cardapio);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Edição do cardápio
apiRouter.post('/cardapio/edit', async(req, res)=>{
    try{
        await Cardapio.update(req.body, {where:{id:req.body.id}});
        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

export default apiRouter;