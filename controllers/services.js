const axios = require("axios");

const estadosGet = async (req, res) => {
  try {
    const url = `https://api.copomex.com/query/get_estados?token=${process.env.COPOMEX}`;
    const response = await axios.get(url);
    const estados = response.data.response.estado;
    res.json({ estados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener datos de estados" });
  }
};

const municipiosGet = async (req, res) => {
  try {
    const { estado } = req.params;
    const url = `https://api.copomex.com/query/get_municipio_por_estado/${estado}?token=${process.env.COPOMEX}`;
    const response = await axios.get(url);
    const municipios = response.data.response.municipios;
    res.json({ municipios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener datos de estados" });
  }
};

module.exports = { estadosGet, municipiosGet };
