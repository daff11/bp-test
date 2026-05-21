const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Material = sequelize.define(
    "Material",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "materials",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Material;