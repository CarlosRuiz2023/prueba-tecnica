const { response, request } = require("express");
const Cliente = require("../models/cliente");
const sequelize = require("../database/config").sequelize;

const clientesGet = async (req = request, res = response) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM clientes");
    const [count] = await sequelize.query("SELECT COUNT(*) FROM clientes");

    res.json({
      total: count,
      clientes: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const clienteGet = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query(
      `SELECT * FROM clientes WHERE id_cliente=${id}`
    );

    res.json({
      cliente: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const clientesPost = async (req, res = response) => {
  try {
    // obtener datos del body
    const {
      nombre,
      telefono,
      email,
      estado,
      municipio,
      colonia,
      calle,
      cp,
      latitud,
      longitud,
    } = req.body;

    // llamar procedimiento
    await Cliente.sequelize.query(
      `CALL insertar_cliente(:nombre, :telefono, :email, :estado, :municipio, :colonia, :calle,:cp, :latitud, :longitud, :id_cliente)`,
      {
        replacements: {
          nombre,
          telefono,
          email,
          estado,
          municipio,
          colonia,
          calle,
          cp,
          latitud,
          longitud,
          id_cliente: null, // lo populamos después
        },
      }
    );

    // obtener id generado
    const [results] = await Cliente.sequelize.query(
      "SELECT LASTVAL() AS id_cliente"
    );
    const idGenerado = results[0].id_cliente;

    res.json({
      msg: "Cliente insertado",
      id: idGenerado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al insertar cliente" });
  }
};

const clientesPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    // obtener datos del body
    const {
      nombre,
      telefono,
      email,
      estado,
      municipio,
      colonia,
      calle,
      cp,
      latitud,
      longitud,
    } = req.body;

    // Llamar al procedimiento
    await Cliente.sequelize.query(
      `CALL actualizar_cliente(:id, :nombre, :telefono, :email,:cp, :estado, :municipio, :colonia, :calle, :latitud, :longitud)`,
      {
        replacements: {
          id,
          nombre,
          telefono,
          email,
          estado,
          municipio,
          colonia,
          calle,
          cp,
          latitud,
          longitud,
        },
      }
    );

    res.json({
      msg: "Cliente actualizado",
      id, // Respondemos con el ID actualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar cliente" });
  }
};

const clientesDelete = async (req, res = response) => {
  try {
    const { id } = req.params;

    // Llamar al procedimiento almacenado para desactivar el cliente
    await Cliente.sequelize.query(`CALL eliminar_cliente(:id)`, {
      replacements: {
        id,
      },
    });

    res.json({ msg: "Cliente eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al desactivar cliente" });
  }
};

module.exports = {
  clientesGet,
  clienteGet,
  clientesPost,
  clientesPut,
  clientesDelete,
};
