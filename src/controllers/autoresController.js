import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultados = await autores.find();
    
      res.status(200).json(autoresResultados);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const {id} = req.params;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null) {
        res.status(200).json(autorResultado);
      } else {
        next(new NaoEncontrado("Id do autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = new autores(req.body);
      await novoAutor.save();

      res.status(201).send(novoAutor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const {id} = req.params;
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorResultado != null) {
        res.status(200).send({message: "autor atualizado com sucesso."});
      } else {
        next(new NaoEncontrado("Id do autor não encontrado"));
      }

    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const {id} = req.params;
      const autorResultado = await autores.findByIdAndDelete(id);

      if(autorResultado != null) {
        res.status(200).send({message: "autor excluído com sucesso"});
      } else {
        next(new NaoEncontrado("Id do autor não encontrado"));
      }
      
    } catch (err) {
      next(err);
    }
  };

}

export default AutorController;