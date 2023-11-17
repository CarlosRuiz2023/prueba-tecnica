const axios = require("axios");
const { response } = require("express");

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
    res.status(500).json({ msg: "Error al obtener datos del municipio" });
  }
};

const coordenadasPost = async (req, res = response) => {
  try {
    const { estado, municipio, colonia, calle } = req.body;

    const estadoFormat = estado.replace(/\s/g, "%20");
    const coloniaFormat = colonia.replace(/\s/g, "%20");
    const municipioFormat = municipio.replace(/\s/g, "%20");
    const calleFormat = calle.replace(/\s/g, "%20");

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${estadoFormat}%20${municipioFormat}%20${coloniaFormat}%20${calleFormat}.json?country=mx&proximity=ip&access_token=${process.env.MAPBOX_KEY}`;
    const response = await axios.get(url);
    const coordenadas = response.data.features[0].geometry.coordinates;
    const [longitud, latitud] = coordenadas;
    res.json({ latitud, longitud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las coordenadas" });
  }
};

module.exports = { estadosGet, municipiosGet, coordenadasPost };
