import sequelize from "../db";
import { DataTypes } from "sequelize";

const TagsAeP = sequelize.define("TsagsAeP",
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        txt:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default TagsAeP;