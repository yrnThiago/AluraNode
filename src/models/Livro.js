import mongoose from "mongoose";

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
      required: [true, "O(a) autor(a) é obrigatório"]
    },
    editora: {
      type: String, 
      required: [true, "A editora é obrigatória"],
      enum: { 
        values: ["Casa do Código", "Alura", "Programação"],
        message: "A editora {VALUE} não é permitida"
      }
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

const livros = mongoose.model("livros", livroSchema);

export default livros;
