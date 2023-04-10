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
        unique: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    fotoPerfil:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    senha:{
        type: DataTypes.STRING,
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

const nanoId = customAlphabet('0123456789', 6);

NConfirmadosFuncionarios.beforeCreate((func)=>{
    func.codigo = nanoId();
});

export default NConfirmadosFuncionarios;