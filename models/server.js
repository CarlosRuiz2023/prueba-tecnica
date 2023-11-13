const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      clientes: "/api/clientes",
      services: "/api/services",
    };
    //Conectar a base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio Publico
    this.app.use(express.static("public"));
    // Fileupload - Carga de archivos
    /* this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    ); */
  }

  routes() {
    this.app.use(this.paths.clientes, require("../routes/clientes"));
    this.app.use(this.paths.services, require("../routes/services"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
