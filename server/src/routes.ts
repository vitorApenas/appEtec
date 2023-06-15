import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import {ReferenciaFuncionarios, NConfirmadosFuncionarios, ReferenciaAlunos, NConfirmadosAlunos, AlunosAtivos, FuncionariosAtivos} from '../db/models';
const bcrypt = require('bcrypt');
//const multer = require('multer');

const apiRouter = Router();

const gerarCodigo = customAlphabet('0123456789', 6);

const hashPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
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
        res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        })
    }
});

//Cadastro de Aluno
apiRouter.post("/cadastro/aluno", async(req, res)=>{
    
    const rm = req.body.rm;
    const senha = req.body.senha;

    const hashedPass = await hashPassword(senha);

    const buscaRef = await ReferenciaAlunos.findAll({where:{rm:rm}});
    
    const alunoNovo = await AlunosAtivos.create({
        rm: buscaRef[0].rm,
        email: buscaRef[0].email,
        nome: buscaRef[0].nome,
        rg: buscaRef[0].rg,
        turma: buscaRef[0].turma,
        fotoPerfil: 'foto.jpg',
        senha: hashedPass
    });
    return res.json({criado: alunoNovo});

});

//Login de Aluno
apiRouter.post('/login/aluno', async(req, res)=>{
    const rm = req.body.rm;
    const senha = req.body.senha;

    const buscaAtivos = await AlunosAtivos.findAll({where:{rm:rm}});
    if(!buscaAtivos[0]) return res.json({msg: "O aluno com esse RM não tem conta!"});
    if(buscaAtivos[0].senha !== senha) return res.json({msg: "Senha incorreta"});
    res.json(buscaAtivos[0]);
});

export default apiRouter;