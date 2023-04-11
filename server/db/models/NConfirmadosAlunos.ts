import sequelize from "../db";
import {DataTypes} from 'sequelize'
import { customAlphabet } from "nanoid";

const NConfirmadosAlunos = sequelize.define('NConfirmadosAlunos',
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        rm:{
            type: DataTypes.INTEGER,
            validate: {
                len: [6]
            }
        },
        fotoPerfil:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        codigo:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz');

NConfirmadosAlunos.beforeCreate((aluno)=>{
    aluno.id = nanoId();
});

export default NConfirmadosAlunos;