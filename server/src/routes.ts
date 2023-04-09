import {Router} from 'express';

const apiRouter = Router();

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    res.json({
        "message":"API funcionando"
    })
});

//Cadastro de funcionário
apiRouter.get('/cadastro/funcionario', (req, res)=>{
    
});
//Cadastro de aluno
apiRouter.get('/cadastro/aluno', (req, res)=>{
    
});

export default apiRouter;