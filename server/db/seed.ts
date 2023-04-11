import sequelize from "./db";
import {AlunosAtivos, FuncionariosAtivos, ReferenciaAlunos, ReferenciaFuncionarios} from './models';

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

interface typeAlunosAtivos {
    rm: Number,
    email: String,
    nome: String,
    rg: String,
    turma: String,
    fotoPerfil: String, 
    senha: String
}

interface typeFuncionariosAtivos {
    email: String,
    nome: String,
    fotoPerfil: String,
    senha: String
}

//Arquivo para RESETAR e POPULAR o database com dados para teste
(async()=>{
    const alunosReferencia:typeReferenciaAlunos[] = [
        {
            rm: 210083,
            email: 'vitor.estevanin@etec.sp.gov.br',
            turma: '3E - Desenvolvimento de Sistemas',
            nome: 'Vitor Mendes Estevanin',
            rg: '11.111.111-1'
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
            nome: 'Rosa Mitiko Shimizu'
        },
        {
            id: 'E_M4nW-7ij3OSLNpcaLVm',
            email: 'paula.simas@etec.sp.gov.br',
            nome: 'Paula da Silva Simas'
        },
        {
            id: '1nF3Vq2rM-3FwM26Kitjx',
            email: 'nilson.anjos@etec.sp.gov.br',
            nome: 'Nilson dos Anjos'
        }
    ];

    const alunosAtivos:typeAlunosAtivos[] = [
        {
            rm: 210083,
            email: 'vitor.estevanin@etec.sp.gov.br',
            nome: 'Vitor Mendes Estevanin',
            rg: '11.111.111-1',
            turma: '3E - Desenvolvimento de Sistemas',
            fotoPerfil: 'fotoVitor.png', 
            senha: 'vitor123'
        }
    ];

    const funcionariosAtivos:typeFuncionariosAtivos[] = [
        {
            email: 'rosa.shimizu@etec.sp.gov.br',
            nome: 'Rosa Mitiko Shimizu',
            fotoPerfil: 'fotoRosinha.png',
            senha: 'rosa123'
        }
    ];

    await sequelize.sync({force: true});

    await ReferenciaAlunos.bulkCreate(alunosReferencia);
    await ReferenciaFuncionarios.bulkCreate(funcionariosReferencia);
    await AlunosAtivos.bulkCreate(alunosAtivos);
    await FuncionariosAtivos.bulkCreate(funcionariosAtivos);
})();