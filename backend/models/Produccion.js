import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Produccion = db.define('produccion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidadProducida : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    producto : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lineaProduccion : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Produccion;