const Point = require("../model/point");
const { v4: uuidv4, validate: isUUID } = require('uuid');
const neo4jController = require("./neo4jControlers");

//Funções
// Função para calcular a distância entre dois pontos geográficos usando a fórmula de Haversine
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio médio da Terra em quilômetros

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distância em quilômetros

  return distance;
}

// Função auxiliar para converter graus em radianos
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

//Method for listing occurrences
module.exports.listOccurrences = async function (req, res){
    const point = await Point.find({});
    res.status(200).send(point);
};

//Method for adding occurrences
module.exports.addOccurrences = async function (req, res){
  try {
    //Criando o ponto
    const point = await Point.create(req.body);

    //Pegando as coordenadas do ponto criado
    const coordinates = point.geometric.coordinates;

    //Salvando o ponto como objeto como nó no neo4j
    await neo4jController.salvar(point.title, point.type, coordinates);

    //Criando relação de tipo
    await neo4jController.relationType(point.title);

    // Obtendo todos os pontos existentes
    const allPoints = await Point.find({});

    // Verificando a distância entre o novo ponto e todos os outros pontos
    for (const existingPoint of allPoints) {
        const existingCoordinates = existingPoint.geometric.coordinates;
        const distance = haversineDistance(coordinates[1], coordinates[0], existingCoordinates[1], existingCoordinates[0]);

        if (distance <= 2 && existingPoint.title != point.title) {
            // Criando relacionamento e armazenando a distância
            await neo4jController.relationDistance(point.title, existingPoint.title, distance);
        }
    }

    res.status(202).send(point);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.title) {
      // Se o erro for de chave duplicada para o campo "title"
      res.status(400).send("O título deve ser exclusivo.");
    } else {
      // Outro erro
      res.status(500).send("Erro interno do servidor");
    }
  }
};

//Method for deleting occurrences
module.exports.delOccurrences = async function (req, res){
  try {
    const eventId = req.params.id;

    // Verificar se o ID é válido
    if (!isUUID(eventId, 4)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const point = await Point.findById(eventId);

    //Verifica se a ocorrência existe
    if (!point) {
      return res.status(404).json({ erro: "Ocorrência não encontrada" });
    }
    
    //Removendo nó
    await neo4jController.remove(point.title);

    // Excluir o evento
    await Point.findByIdAndDelete(eventId);

    // Resposta JSON
    res.status(200).json({ mensagem: "Evento removido com sucesso", id: eventId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

//Method for updating occurrences
module.exports.updateOccurrences = async function (req, res){
  try {
    const eventId = req.params.id;

    // Verificar se o ID é válido
    if (!isUUID(eventId, 4)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const point = await Point.findById(eventId);

    //Verifica se o ponto existe
    if (!point) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    //Pegando as coordenadas do ponto atualizado
    const coordinates = point.geometric.coordinates;

    //Atualizando nó
    await neo4jController.update(point.title, point.type, coordinates);

    //Atualizando a ocorrência
    const occorrenceUpdate = await Point.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send(occorrenceUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro interno do servidor" });   
  }
}