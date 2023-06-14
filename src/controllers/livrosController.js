import {livros, editoras, autores} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      let {limite = 5, pagina = 1} = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if(limite > 0 && pagina > 0) {
        const livrosResultados = await livros.find()
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .populate("editora")
          .exec();

        res.status(200).json(livrosResultados);
      } else {
        next(new RequisicaoIncorreta());
      }
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const livroResultado = await livros.find(busca)
          .populate("editora")
          .populate("autor");

        res.status(200).json(livroResultado);
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      next(err);
    }
  };

}

async function processaBusca(params){
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};

  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(editora) {
    const editoraResultado = await editoras.findOne({nome: editora});
    
    if(editoraResultado !== null) busca.editora = editoraResultado._id;
    else busca = null;
  }

  if(nomeAutor) {
    const autor = await autores.findOne({nome: nomeAutor});

    if(autor !== null) busca.autor = autor._id;
    else busca = null;
  }

  return busca;
}

export default LivroController;