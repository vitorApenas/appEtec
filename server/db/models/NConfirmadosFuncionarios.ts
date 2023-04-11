import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { customAlphabet } from "nanoid";

const NConfirmadosFuncionarios = sequelize.define('NConfirmadosFuncionarios',
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

const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-');

NConfirmadosFuncionarios.beforeCreate((func)=>{
    func.id = nanoId();
});

export default NConfirmadosFuncionarios;