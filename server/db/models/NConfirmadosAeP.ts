import sequelize from "../db";
import { DataTypes } from "sequelize";

const NConfirmadosAeP = sequelize.define("NConfirmadosAeP",
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        img:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        extensao:{
            type: DataTypes.STRING,
            allowNull: true
        },
        txt:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tags:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        updatedAt: false
    }
);

export default NConfirmadosAeP;