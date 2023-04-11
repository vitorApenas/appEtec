import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import {ReferenciaFuncionarios, NConfirmadosFuncionarios, ReferenciaAlunos, NConfirmadosAlunos} from '../db/models'
import { Op } from 'sequelize';

const apiRouter = Router();

const gerarCodigo = customAlphabet('0123456789', 6);

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    res.json({
        "message":"API funcionando"
    })
});

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

/*
//Cadastro de funcionário
apiRouter.get('/cadastro/funcionario', (req, res)=>{
    
});
//Cadastro de aluno
apiRouter.get('/cadastro/aluno', (req, res)=>{
    
});
*/

export default apiRouter;