import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  console.log(`ERROR: ${err.name}\nNAME_ERROR: ${err.message}\nSTACK_ERROR: ${err.stack}`);

  if(err instanceof mongoose.Error.CastError) {
    res.status(400).json({message: "Um ou mais dados fornecidos estão incorretos."});
  } else if(err instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");
    

    res.status(400).json({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});
  } else {
    res.status(500).json({message: "Erro interno do servidor."});
  }
}

export default manipuladorDeErros;
