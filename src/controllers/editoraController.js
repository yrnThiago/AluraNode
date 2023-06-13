import NaoEncontrado from "../erros/NaoEncontrado.js";
import {editoras} from "../models/index.js";

class EditoraController {

  static listarEditoras = async (req, res, next) => {
    try {
      const editorasResultados = await editoras.find();

      res.status(200).json(editorasResultados);
    } catch (err) {
      next(err);
    }
  };

  static listarEditoraPorId = async (req, res, next) => {
    try {
      const {id} = req.params;
      const editoraResultado = await editoras.findById(id);

      if(editoraResultado != null) {
        res.status(200).json(editoraResultado);
      } else {
        next(new NaoEncontrado("ID da editora não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarEditora = async (req, res, next) => {
    try {
      const novaEditora = new editoras(req.body);
      await novaEditora.save();

      res.status(201).json(novaEditora);
    } catch (err) {
      next(err);
    }
  };

  static atualizarEditora = async (req, res, next) => {
    try {
      const {id} = req.params;
      const editoraResultado = await editoras.findByIdAndUpdate(id, {$set: req.body});

      if(editoraResultado != null) {
        res.status(200).json({message: "editora atualizado com sucesso!"});
      } else {
        next(new NaoEncontrado("ID da editora não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirEditora = async (req, res, next) => {
    try {
      const {id} = req.params;
      const editoraResultado = await editoras.findByIdAndDelete(id);

      if(editoraResultado != null) {
        res.status(200).send({message: "editora excluído com sucesso!"});
      } else {
        next(new NaoEncontrado("ID da editora não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

}

export default EditoraController;