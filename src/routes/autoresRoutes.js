import express  from "express";
import AutoresController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", AutoresController.listarAutores, paginar)
  .get("/autores/:id", AutoresController.listarAutorPorId)
  .post("/autores", AutoresController.cadastrarAutor)
  .put("/autores/:id", AutoresController.atualizarAutor)
  .delete("/autores/:id", AutoresController.excluirAutor);

export default router;
