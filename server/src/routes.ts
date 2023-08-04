import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import { Op } from 'sequelize';
import {
    ReferenciaFuncionarios,
    ReferenciaAlunos,
    NConfirmadosFuncionarios, //confirmação de email
    NConfirmadosAlunos,
    AlunosAtivos,
    FuncionariosAtivos,
    Cardapio,
    Turmas,
    Materias,
    Professores,
    Horarios
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
        const buscaRef = await ReferenciaAlunos.findAll({where:{rm: rm}});
        if(!buscaRef[0]) return res.json({msg: "Não temos registro desse RM"});

        const buscaAtivos = await AlunosAtivos.findAll({where:{rm: rm}});
        if(buscaAtivos[0]) return res.json({msg: "O aluno com esse RM já está cadastrado"});

        return res.json(res.statusCode);
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

    try{
        const hashedPass = await hashPassword(senha);
        const buscaRef = await ReferenciaAlunos.findAll({where:{rm: rm}});

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
        const buscaRef = await ReferenciaFuncionarios.findAll({where:{email: email}});
        if(!buscaRef[0]) return res.json({msg: "Esse funcionário não está registrado"});

        const buscaAtivos = await FuncionariosAtivos.findAll({where:{email: email}});
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

    const buscaRef = await ReferenciaFuncionarios.findAll({where:{email: email}});

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
        const buscaAtivos = await AlunosAtivos.findAll({where:{rm: rm}});
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

apiRouter.get('/turmas', async (req, res)=>{
    try{
        const turmas = await Turmas.findAll({order:['turma']});
        return res.json(turmas);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta de horário por funcionário
apiRouter.post('/horarioFunc', async(req, res)=>{
    const idTurma = req.body.turma;
    try {
        const horarios = await Horarios.findAll({where:{idTurma:idTurma}, order:['aula']});
        if(!horarios[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
        let output:object[] = [];
        
        let i = 0;
        while(i < horarios.length){
            const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla']});
            const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla']});
            output[i] = {
                id: horarios[i].id,
                aula: horarios[i].aula,
                horario: horarios[i].horario,
                materia: materia[0].sigla,
                prof: prof[0].sigla
            };
            i++;
        }
        return res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Checar se a matéria existe
apiRouter.post('/check/materia', async (req, res)=>{
    const sigla = req.body.sigla;
    try{
        const buscaMaterias = await Materias.findAll({where: {sigla: sigla}});
        if(!buscaMaterias[0]) return res.json({msg: `Não existe matéria com a sigla ${sigla}`});
        return res.json(buscaMaterias[0]);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Checar se o professor existe
apiRouter.post('/check/professor', async (req, res)=>{
    const sigla = req.body.sigla;
    try{
        const buscaProfs = await Professores.findAll({where: {sigla: sigla}});
        if(!buscaProfs[0]) return res.json({msg: `Não existe professor com a sigla ${sigla}`});
        return res.json(buscaProfs[0]);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Edição de aula no horário
apiRouter.post('/horario/edit', async (req, res)=>{
    const idHorario = req.body.idHorario;
    const idMateria = req.body.idMateria;
    const idProf = req.body.idProf;
    try{
        if(await Horarios.update({idMateria: idMateria, idProf: idProf},{where:{id:idHorario}})){
            return res.json(res.statusCode);
        }
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta de horário por aluno
apiRouter.post('/horarioAluno', async (req, res)=>{
    const turma = req.body.turma;
    try{
        const infoTurma = await Turmas.findAll({where: {turma: turma}});
        if(!infoTurma[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });

        const horarios = await Horarios.findAll({where: {idTurma: infoTurma[0].id}, order: ['aula']});
        let output:object[] = [];
        
        let i = 0;
        while(i < horarios.length){
            const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla', 'nome']});
            const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla', 'nome', 'sala', 'presente']});
            output[i] = {
                aula: horarios[i].aula,
                horario: horarios[i].horario,
                nomeMateria: materia[0].nome,
                materia: materia[0].sigla,
                nomeProf: prof[0].nome,
                sala: prof[0].sala,
                presente: prof[0].presente,
                prof: prof[0].sigla
            };
            i++;
        }
        return res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

apiRouter.post('/aulaAtual', async (req, res)=>{
    const siglaTurma = req.body.turma;
    const dia = req.body.dia;
    const hora = req.body.hora;
    const minuto = req.body.minuto;
    try{
        if(dia===0 || dia===6) return res.json({
            aulaAtual: "-",
            profAtual: "-",
            salaAtual: "-",
            presente: false
        });
        const infoTurma = await Turmas.findAll({where: {turma: siglaTurma}});
        if(!infoTurma[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });

        const aula = await Horarios.count({where: {idTurma: infoTurma[0].id}});

        if(aula > 30){
            const horarios = await Horarios.findAll({where: {aula: {[Op.between]: [(dia-1)*9, dia*9-1]}}, order: ['aula']});

            let output:any[] = [];
            
            let i = 0;
            while(i < horarios.length){
                const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla', 'nome']});
                const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla', 'nome', 'sala', 'presente']});
                
                output[i] = {
                    siglaMateria: materia[0].sigla,
                    prof: prof[0].nome,
                    siglaProf: prof[0].sigla,
                    salaProf: prof[0].sala,
                    presente: prof[0].presente
                }

                i++;
            }
            
            let index;
            
            if(hora < 7 || (hora == 7 && minuto < 20) || hora >= 17) return res.json({aulaAtual: "-", profAtual: "-", salaAtual: "-", presenteAtual: false});
            if((hora == 7 && minuto >= 20) || (hora == 8 && minuto < 10)) index = 0;
            if((hora == 8 && minuto >= 10) && hora < 9) index = 1;
            if(hora == 9 && minuto < 50) index = 2;
            if((hora == 10 && minuto >= 10) && hora < 11) index = 3;
            if(hora == 11 && minuto < 50) index = 4;
            if((hora == 13 && minuto >= 20) || (hora == 14 && minuto < 10)) index = 5;
            if((hora == 14 && minuto >= 10) && hora < 15) index = 6;
            if((hora == 15 && minuto >= 20) || (hora == 16 && minuto < 10)) index = 7;
            if((hora == 16 && minuto >= 10) && hora < 17) index = 8;
            if(index == undefined) return res.json({aulaAtual: "Intervalo", profAtual: "-", salaAtual: "-"});

            let nomeProfAtual
            
            if(output[index].prof != "Aula vaga"){
                if(output[index].prof.split(' ')[0].length > 9){
                    nomeProfAtual = output[index].siglaProf;
                }
                else{
                    nomeProfAtual = output[index].prof.split(' ')[0];
                }
            }
            
            return res.json({
                aulaAtual: output[index].siglaMateria,
                profAtual: nomeProfAtual == undefined ? output[index].prof : nomeProfAtual,
                salaAtual: output[index].salaProf,
                presenteAtual: output[index].presente,
                proxAula: '',
                proxProf: '',
                proxSala: ''
            })
            //return res.json(output[index])
            //return res.json(index)
        }
        else{
            return res.json({msg: "Em desenvolvimento..."});
        }
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

export default apiRouter;