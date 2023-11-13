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

const existeClientePorId = async (id) => {
  // Verificar si el cliente existe por su ID
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    throw new Error(`El cliente con ID ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  existeClientePorId,
};
