const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const dbConnection = async () => {
  try {
    const client = new Client({
      host: process.env.PG_CONNECTION_STRING,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: 5432,
      ssl: true,
    });

    await client.connect();
    console.log("Base de datos online");
    return { client };
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.PG_CONNECTION_STRING,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

module.exports = {
  dbConnection,
  sequelize,
};
