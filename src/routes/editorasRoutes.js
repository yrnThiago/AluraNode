import express  from "express";
import EditorasController from "../controllers/editoraController.js";

const router = express.Router();

router
  .get("/editoras", EditorasController.listarEditoras)
  .get("/editoras/:id", EditorasController.listarEditoraPorId)
  .post("/editoras", EditorasController.cadastrarEditora)
  .put("/editoras/:id", EditorasController.atualizarEditora)
  .delete("/editoras/:id", EditorasController.excluirEditora);

export default router;
