import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultados = await autores.find();
    
      res.status(200).json(autoresResultados);
    } catch (err) {
      res.status(500).json({message: "Erro interno no servidor."});
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const {id} = req.params;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null) {
        res.status(200).json(autorResultado);
      } else {
        res.status(404).json({message: "Id do autor não localizado."});
      }
    } catch (err) {
      if(err instanceof mongoose.Error.CastError) {
        res.status(400).json({message: "Um ou mais dados fornecidos estão incorretos."});
      } else {
        res.status(500).json({message: "Erro interno do servidor."});
      }
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

      res.status(200).send({message: "autor atualizado com sucesso."});
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao atualizar autor.`});
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