import sequelize from "./db";
import {ReferenciaAlunos} from './models';

interface typeReferenciaAlunos {
    rm: Number,
    email: String,
    turma: String,
    nome: String,
    rg: String
}

//Arquivo para RESETAR e POPULAR o database com dados para teste
(async()=>{
    sequelize.sync({force: true});

    const alunosReferencia:typeReferenciaAlunos[] = [
        {
            rm: 210083,
            email:'vitor.estevanin@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Vitor Mendes Estevanin',
            rg:'11.111.111-1'
        },
        {
            rm: 210057,
            email:'vinicius.roberto2@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Vinicius da Silva Roberto',
            rg:'22.222.222-2'
        },
        {
            rm: 2,
            email:'',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'',
            rg:'33.333.333-3'
        },
        {
            rm: 3,
            email:'',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'',
            rg:'44.444.444-4'
        },
        {
            rm: 4,
            email:'',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'',
            rg:'55.555.555-5'
        },
        {
            rm: 5,
            email:'',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'',
            rg:'66.666.666-6'
        },
    ]
    await ReferenciaAlunos.bulkCreate();
})();