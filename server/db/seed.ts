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
            rm: 210066,
            email:'rodrigo.lucena01@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Rodrigo Fernandes de Lucena',
            rg:'33.333.333-3'
        }
    ];

    sequelize.sync({force: true});

    await ReferenciaAlunos.bulkCreate(alunosReferencia);
})();