import livros from "../models/Livro.js";
import editoras from "../models/Editora.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultados = await livros.find()
        .populate("autor")
        .populate("editora")
        .exec();

      res.status(200).json(livrosResultados);
    } catch (error) {
      res.status(500).json({message: "Erro interno do servidor!"});
    }

  };

  static listarLivroPorId = async (req, res) => {
    try {
      const {id} = req.params;
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .populate("editora", "nome")
        .exec();
      
      res.status(200).json(livroResultado);
    } catch (err) {
      res.status(400).json({message: `${err.message} - Id do livro não localizado.`});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      const novoLivro = new livros(req.body);
      await novoLivro.save();

      res.status(201).json(novoLivro);
    } catch (err) {
      res.status(500).json({message: `${err.message} - falha ao cadastrar livro.`});
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const {id} = req.params;
      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).json({message: "Livro atualizado com sucesso!"});
    } catch (err) {
      res.status(500).json({message: `${err.message} - falha ao atualizar livro.`});
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const {id} = req.params;
      await livros.findByIdAndDelete(id);

      res.status(200).json({message: "Livro excluído com sucesso!"});
    } catch (err) {
      res.status(500).json({message: `${err.message}`});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const { editora } = req.query;
      const editoraResultado = await editoras.findOne({ nome: editora });
  
      if (!editoraResultado) {
        res.status(404).json({ message: "Editora não encontrada." });
        return;
      }
  
      const livrosEditoraResultados = await livros.find({ editora: editoraResultado._id }).populate("editora", "nome");
  
      res.status(200).json(livrosEditoraResultados);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

}

export default LivroController;