import sequelize from "../db";
import { DataTypes } from "sequelize";

const ReferenciaAlunos = sequelize.define('ReferenciaAlunos', {
    rm:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate:{
            isInt: true,
            len: [6]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    turma:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    rg:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    }
    
});

export default ReferenciaAlunos;