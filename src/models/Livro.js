import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O(a) autor(a) é obrigatório"],
      autopopulate: true
    },
    editora: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "editoras",
      required: [true, "A editora é obrigatória"],
      enum: { 
        values: ["Casa do Código", "Alura", "Programação"],
        message: "A editora {VALUE} não é permitida"
      },
      autopopulate: {select: "nome"}
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O livro deve conter entre 10 e 5000 páginas. Valor fornecido: {VALUE}"
      },
    }
  }
);

const livros = mongoose.model("livros", livroSchema.plugin(autopopulate));

export default livros;
