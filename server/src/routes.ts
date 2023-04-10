import {Router} from 'express';
import { customAlphabet } from 'nanoid';

import sequelize from '../db/db';
import {ReferenciaFuncionarios, NConfirmadosFuncionarios} from '../db/models'

const apiRouter = Router();

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    res.json({
        "message":"API funcionando"
    })
});

apiRouter.get('/testarFun', async(req, res)=>{
    const retFuncs = await ReferenciaFuncionarios.findAll({ where: {email: 'rosa.shimizu@etec.sp.gov.br'}});
    const gerarCodigo = customAlphabet('0123456789', 6);
    try{
        const testeInput = await NConfirmadosFuncionarios.create({
            id: retFuncs[0].id,
            email: retFuncs[0].email,
            fotoPerfil: 'teste.png',
            senha: '123rosa',
            codigo: gerarCodigo()
        });
        res.json(testeInput)
    }
    catch(e){
        res.json({
            "Erro":"Você já recebeu seu email"
        })
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