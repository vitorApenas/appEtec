import sequelize from "./db";
import {AlunosAtivos,
    FuncionariosAtivos,
    ReferenciaAlunos,
    ReferenciaFuncionarios,
    Cardapio
} from './models';

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

interface typeCardapio{
    id: number,
    content1: string,
    content2?: string,
    abertura: string,
    fechamento: string,
    cancelado: boolean
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
            fotoPerfil: 'tuca01.png', 
            senha: '$2b$10$z5NYOo.e2.b0ejxEqgGFseLl15fKpDO/H4rnYI0PqLF1HchGhByR2'
        }
    ];

    const funcionariosAtivos:typeFuncionariosAtivos[] = [
        {
            email: 'rosa.shimizu@etec.sp.gov.br',
            nome: 'Rosa Mitiko Shimizu',
            fotoPerfil: 'tuca01.png',
            senha: '$2b$10$z5NYOo.e2.b0ejxEqgGFseLl15fKpDO/H4rnYI0PqLF1HchGhByR2'
        }
    ];

    const cardapio:typeCardapio[] = [
        {
            id: 0,
            content1: "Bolacha de água e sal",
            content2: "Leite achocolatado",
            abertura: "09:50",
            fechamento: "10:10",
            cancelado: false
        },
        {
            id: 1,
            content1: "Arroz, feijão e salada",
            content2: "Carne de porco",
            abertura: "11:50",
            fechamento: "13:20",
            cancelado: false
        },
        {
            id: 2,
            content1: "Bolacha de chocolate",
            content2: "Suco de laranja",
            abertura: "15:00",
            fechamento: "15:20",
            cancelado: false
        },
        {
            id: 3,
            content1: "Arroz, feijão e salada",
            content2: "Carne de porco",
            abertura: "17:30",
            fechamento: "19:00",
            cancelado: false
        }
    ]

    await sequelize.sync({force: true});

    await ReferenciaAlunos.bulkCreate(alunosReferencia);
    await ReferenciaFuncionarios.bulkCreate(funcionariosReferencia);
    await AlunosAtivos.bulkCreate(alunosAtivos);
    await FuncionariosAtivos.bulkCreate(funcionariosAtivos);
    await Cardapio.bulkCreate(cardapio);
})();