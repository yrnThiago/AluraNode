import editoras from "../models/Editora.js";

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

      res.status(200).json(editoraResultado);
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
      await editoras.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).json({message: "editora atualizado com sucesso!"});
    } catch (err) {
      next(err);
    }
  };

  static excluirEditora = async (req, res, next) => {
    try {
      const {id} = req.params;
      await editoras.findByIdAndDelete(id);

      res.status(200).send({message: "editora excluído com sucesso!"});

    } catch (err) {
      next(err);
    }

  };

}

export default EditoraController;