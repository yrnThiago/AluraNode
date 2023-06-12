import livros from "../models/Livro.js";
import editoras from "../models/Editora.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultados = await livros.find()
        .populate("autor")
        .populate("editora")
        .exec();

      res.status(200).json(livrosResultados);
    } catch (err) {
      next(err);
    }

  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const {id} = req.params;
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .populate("editora", "nome")
        .exec();
      
      res.status(200).json(livroResultado);
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const novoLivro = new livros(req.body);
      await novoLivro.save();

      res.status(201).json(novoLivro);
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const {id} = req.params;
      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).json({message: "Livro atualizado com sucesso!"});
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const {id} = req.params;
      await livros.findByIdAndDelete(id);

      res.status(200).json({message: "Livro excluído com sucesso!"});
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
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
      next(err);
    }
  };

}

export default LivroController;