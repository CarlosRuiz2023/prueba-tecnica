const { DataTypes } = require("sequelize");
const sequelize = require("../database/config").sequelize;

const Cliente = sequelize.define("clientes", {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  municipio: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  colonia: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  calle: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  latitud: {
    type: DataTypes.DECIMAL(9, 6),
    defaultValue: 0.0,
  },
  longitud: {
    type: DataTypes.DECIMAL(9, 6),
    defaultValue: 0.0,
  },
  createdAt: {
    field: "createdat",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updatedat",
    type: DataTypes.DATE,
  },
});

module.exports = Cliente;
