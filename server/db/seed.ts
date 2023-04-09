import sequelize from "./db";
import {ReferenciaAlunos, ReferenciaFuncionarios} from './models';

interface typeReferenciaAlunos {
    rm: Number,
    email: String,
    turma: String,
    nome: String,
    rg: String
}

interface typeReferenciaFuncionarios {
    id: String,
    email: String,
    nome: String
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

    const funcionariosReferencia:typeReferenciaFuncionarios[] = [
        {
            id: 'Jco10xWw6n2WicfyrkitR',
            email: 'rosa.shimizu@etec.sp.gov.br',
            nome: 'rosa mitiko shimizu'
        },
        {
            id: 'E_M4nW-7ij3OSLNpcaLVm',
            email: 'paula.simas@etec.sp.gov.br',
            nome: 'paula da silva simas'
        },
        {
            id: '1nF3Vq2rM-3FwM26Kitjx',
            email: 'nilson.anjos@etec.sp.gov.br',
            nome: 'nilson dos anjos'
        }
    ];

    sequelize.sync({force: true});

    await ReferenciaAlunos.bulkCreate(alunosReferencia);
    await ReferenciaFuncionarios.bulkCreate(funcionariosReferencia);
})();