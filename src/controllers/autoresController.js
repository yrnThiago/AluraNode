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
        res.status(404).json({message: "Id do autor não localizado."});
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
      await autores.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "autor atualizado com sucesso."});
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const {id} = req.params;
      await autores.findByIdAndDelete(id);

      res.status(200).send({message: "autor excluído com sucesso."});
    } catch (err) {
      res.status(500).send({message: `${err.message}`});
    }
  };

}

export default AutorController;