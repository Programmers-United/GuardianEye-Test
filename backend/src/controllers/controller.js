const Point = require("../model/point");
const { v4: uuidv4, validate: isUUID } = require('uuid');

//Method for listing occurrences
module.exports.listOccurrences = async function (req, res){
    const point = await Point.find({});
    res.status(200).send(point);
};

//Method for adding occurrences
module.exports.addOccurrences = async function (req, res){
  try {
    const point = await Point.create(req.body);
    res.status(202).send("Saved");
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.title) {
      // Se o erro for de chave duplicada para o campo "title"
      res.status(400).send("Title must be unique.");
    } else {
      // Outro erro
      res.status(500).send("Internal Server Error");
    }
  }
};

//Method for deleting occurrences
module.exports.delOccurrences = async function (req, res){
  try {
    const eventId = req.params.id;

    // Verificar se o ID é válido
    if (!isUUID(eventId, 4)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const point = await Point.findById(eventId);

    if (!point) {
      return res.status(404).json({ erro: 'Evento não encontrado' });
    }

    // Excluir o evento
    await Point.findByIdAndDelete(eventId);

    // Resposta JSON melhorada
    res.status(200).json({ mensagem: 'Evento removido com sucesso', id: eventId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

//Method for updating occurrences
module.exports.updateOccurrences = async function (req, res){
  try {
    const eventId = req.params.id;

    // Verificar se o ID é válido
    if (!isUUID(eventId, 4)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const point = await Point.findById(eventId);

    if (!point) {
      return res.status(404).json({ erro: 'Evento não encontrado' });
    }

    //Atualizando a ocorrência
    const occorrenceUpdate = await Point.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send(occorrenceUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno do servidor' });   
  }
}