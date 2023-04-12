import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import {ReferenciaFuncionarios, NConfirmadosFuncionarios, ReferenciaAlunos, NConfirmadosAlunos, AlunosAtivos, FuncionariosAtivos} from '../db/models'
import {compareSync} from 'bcrypt'

const apiRouter = Router();

const gerarCodigo = customAlphabet('0123456789', 6);

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

//Cadastro de Aluno
apiRouter.post("/cadastro/aluno", async(req, res)=>{
    const rm = req.body.rm;
    const senha = req.body.senha;

    const busca = await ReferenciaAlunos.findAll({where:{rm:rm}});
    res.json(busca)
});

//Login de Aluno
apiRouter.get('/login/aluno', async(req, res)=>{
    const login = req.body.login;
    const senha = req.body.senha;

    if(isNaN(Number(login))){
        //const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexEmail = /^[^\s@]+@etec.sp.gov.br$/;
        if(!regexEmail.test(login)){
            res.json({
                Erro:"login invalido"
            });
            return;
        }
        //Caso seja um email válido
        const busca = await AlunosAtivos.findAll({where:{email: login}});
        /*if(compareSync(senha, busca[0].senha)){
            res.json({
                Mensagem: "Login feito com sucesso"
            })*/
        res.json(busca);
    }
    else{
        //caso o input seja de números
        if(login.length !== 6){
            res.json({
                Erro:"login invalido"
            });
            return;
        }
        //caso tenha 6 números (rm válido)
        const busca = await AlunosAtivos.findAll({where:{rm:Number(login)}});
        if(compareSync(senha, busca[0].senha)){
            res.json({
                Mensagem: "Login feito com sucesso"
            });
            return;
        }
        res.json(busca);
    }
});

export default apiRouter;