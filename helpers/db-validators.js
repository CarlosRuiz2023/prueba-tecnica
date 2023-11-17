const { response } = require("express");
const { Op } = require("sequelize");

const Cliente = require("../models/cliente");

const emailExiste = async (email = "") => {
  //Verificar si el correo existe
  const cliente = await Cliente.findOne({
    where: {
      email: email,
    },
  });

  if (cliente) {
    throw new Error(`El email ${email} ya está registrado`);
  }
};

const emailInexiste = async (email = "", id = 0) => {
  //Verificar si el correo existe
  const cliente = await Cliente.findOne({
    where: {
      email: email,
    },
  });
  if (cliente) {
    if (cliente.dataValues.id_cliente != `${id}`) {
      throw new Error(`El email ${email} ya está registrado con otro ID`);
    }
  }
};

const existeClientePorId = async (id) => {
  // Verificar si el cliente existe por su ID
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    throw new Error(`El cliente con ID ${id} no existe`);
  }
};

const existeClientePorNombre = async (nombre) => {
  // Verificar si el cliente existe por su ID
  const cliente = await Cliente.findOne({
    where: {
      nombre: {
        [Op.iLike]: `%${nombre}%`,
      },
    },
  });

  if (!cliente) {
    throw new Error(`El cliente con nombre ${nombre} no existe`);
  }
};

const validarCP = (value) => {
  if (!/^\d{5}$/.test(value)) {
    throw new Error("El CP debe tener 5 dígitos");
  }
  return true;
};

module.exports = {
  emailInexiste,
  emailExiste,
  existeClientePorId,
  existeClientePorNombre,
  validarCP,
};
