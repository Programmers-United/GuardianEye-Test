const driver = require("../database/connectWithNeo4j");

module.exports.salvar = async function(title, type, coordinates){
    var session = driver.session();

    //Cria e salva no banco
    await session.run( "CREATE (:Ocorrence {title: $title, type: $type, location: point({latitude: $latitude, longitude: $longitude})})",
    {
      title: title,
      type: type,
      latitude: coordinates[1],  // Índice 1 é a latitude
      longitude: coordinates[0], // Índice 0 é a longitude
    }
    ).then(result => console.log(result.summary.counters._stats.nodesCreated))
    .catch(e => console.log(e));

    session.close();
} 