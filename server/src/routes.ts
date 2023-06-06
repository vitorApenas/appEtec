import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import {ReferenciaFuncionarios, NConfirmadosFuncionarios, ReferenciaAlunos, NConfirmadosAlunos, AlunosAtivos, FuncionariosAtivos} from '../db/models';
//const multer = require('multer');

const apiRouter = Router();

const gerarCodigo = customAlphabet('0123456789', 6);

/*const profilePic = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../assets/profilePics');
    },
    filename: function(req, file, cb){
        const extensao = file.originalName.split('.')[1];
        const nome = file.originalName.split('.')[0];

        cb(null, `${nome}.${extensao}`);
    }
});
const uploadProfilePic = multer({profilePic})*/

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    res.json({
        "message":"API funcionando"
    })
});

/*
//Teste da tabela de não confirmados (funcionários)
apiRouter.get('/testarFun', async(req, res)=>{
    const retFuncs = await ReferenciaFuncionarios.findAll({ where: {email: 'rosa.shimizu@etec.sp.gov.br'}});
    
    try{
        const testeInput = await NConfirmadosFuncionarios.create({
            email: retFuncs[0].email,
            fotoPerfil: 'teste.png',
            senha: '123rosa',
            codigo: gerarCodigo()
        });
        res.json(testeInput);
    }
    catch(err){
        res.json({
            "Erro":err
        });
    }
});

//Teste da tabela de não confirmados (alunos)
apiRouter.get('/testarAluno', async(req, res)=>{
    const retAlunos = await ReferenciaAlunos.findAll({
        where: {
            [Op.or]:[
                {rm: 210083},
                {email: 'vitor.estevanin@etec.sp.gov.br'}
            ]
        }
    });
    try{
        const testeInput = await NConfirmadosAlunos.create({
            email: retAlunos[0].email,
            rm: retAlunos[0].rm,
            fotoPerfil: 'teste.png',
            senha: '123vito',
            codigo: gerarCodigo()
        });
        res.json(testeInput);
    }
    catch(err){
        res.json({
            "Erro":err
        });
    }
});
*/

//Checar se o aluno está ativo
apiRouter.post("/check/aluno", async(req, res)=>{
    const rm = req.body.rm;
    try{
        //const buscaRef = await ReferenciaAlunos.findAll({where:{rm:rm}});
        const teste = await ReferenciaAlunos.findAll();
        console.log("eitas")
    }
    catch(err){
        console.log(err);
        res.json({
            msg: "deu erro"
        })
    }
    
    /*const buscaAtivos = await AlunosAtivos.findAll({where:{rm:rm}});
    if(buscaRef[0]){
        if(buscaAtivos[0]){
            res.json({
                msg: "O aluno com esse RM já está cadastrado."
            })
        }
        else{
            res.json({code: res.statusCode});
        }
    }
    else{
        res.json({
            msg: "Não existe aluno com esse RM"
        })
    }*/
});

//Cadastro de Aluno
apiRouter.post("/cadastro/aluno", async(req, res)=>{
    
    const rm = req.body.rm;
    const senha = req.body.senha;

    const buscaRef = await ReferenciaAlunos.findAll({where:{rm:rm}});
    
    const alunoNovo = await AlunosAtivos.create({
        rm: buscaRef[0].rm,
        email: buscaRef[0].email,
        nome: buscaRef[0].nome,
        rg: buscaRef[0].rg,
        turma: buscaRef[0].turma,
        fotoPerfil: 'foto.jpg',
        senha: senha
    });
    res.json({criado: alunoNovo});

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