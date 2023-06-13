import {livros, editoras} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
      
      if(livroResultado != null) {
        res.status(200).json(livroResultado);
      } else {
        next(new NaoEncontrado("ID do livro não encontrado"));
      }
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
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResultado != null) {
        res.status(200).json({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("ID do livro não encontrado"));
      }
      
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const {id} = req.params;
      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado != null) {
        res.status(200).json({message: "Livro excluído com sucesso"});
      } else {
        next(new NaoEncontrado("ID do livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const { editora } = req.query;
      const editoraResultado = await editoras.findOne({ nome: editora });
  
      if (!editoraResultado) {
        next(new NaoEncontrado("Editora não encontrada"));
      }
  
      const livrosEditoraResultados = await livros.find({ editora: editoraResultado._id }).populate("editora", "nome");
  
      res.status(200).json(livrosEditoraResultados);
    } catch (err) {
      next(err);
    }
  };

}

export default LivroController;