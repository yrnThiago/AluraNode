import editoras from "../models/Editora.js";

class EditoraController {

  static listarEditoras = async (req, res) => {
    try {
      const editorasResultados = await editoras.find();
      
      res.status(200).json(editorasResultados);
    } catch (err) {
      res.status(500).json({message: "Erro interno do servidor!"});
    }
  };

  static listarEditoraPorId = async (req, res) => {
    try {
      const {id} = req.params;
      const editoraResultado = await editoras.findById(id);

      res.status(200).json(editoraResultado);
    } catch (err) {
      res.status(400).json({message: `${err.message} - Id da editora não localizado.`});
    }
  };

  static cadastrarEditora = async (req, res) => {
    try {
      const novaEditora = new editoras(req.body);
      await novaEditora.save();

      res.status(201).json(novaEditora);
    } catch (err) {
      res.status(500).json({message: `${err.message} - falha ao cadastrar editora.`});
    }
  };

  static atualizarEditora = async (req, res) => {
    try {
      const {id} = req.params;
      await editoras.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).json({message: "editora atualizado com sucesso!"});
    } catch (err) {
      res.status(500).json({message: `${err.message} - falha ao atualizar editora.`});
    }
  };

  static excluirEditora = async (req, res) => {
    try {
      const {id} = req.params;
      await editoras.findByIdAndDelete(id);

      res.status(200).send({message: "editora excluído com sucesso!"});

    } catch (err) {
      res.status(500).send({message: `${err.message}`});
    }

  };

}

export default EditoraController;