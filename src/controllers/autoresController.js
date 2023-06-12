import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultados = await autores.find();
    
      res.status(200).json(autoresResultados);
    } catch (err) {
      res.status(500).json({message: "Erro interno no servidor!"});
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const {id} = req.params;
      const autorResultado = await autores.findById(id);

      res.status(200).send(autorResultado);
    } catch (err) {
      res.status(400).send({message: `${err.message} - Id do autor não localizado.`});
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      const novoAutor = new autores(req.body);
      await novoAutor.save();

      res.status(201).send(novoAutor.toJSON());
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const {id} = req.params;
      await autores.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "autor atualizado com sucesso!"});
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao atualizar autor.`});
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const {id} = req.params;
      await autores.findByIdAndDelete(id);

      res.status(200).send({message: "autor excluído com sucesso!"});
    } catch (err) {
      res.status(500).send({message: `${err.message}`});
    }
  };

}

export default AutorController;