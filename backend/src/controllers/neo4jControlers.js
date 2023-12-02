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

module.exports.remove = async function(title){
    var session = driver.session();

    try {
        // Tenta encontrar o nó pelo título 
        const findNodeResult = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {title: $title}) RETURN n",
            {
                title,
            }
        );
        
        //Se encontrou remove
        const node = findNodeResult.records[0].get("n"); 
        if (node) {
            await session.run( "MATCH (n:Ocorrence {title: $title}) DETACH DELETE n", 
            {
                title
            });
        }else{ //Se não
            console.log(`Nó com o título ${title} não existe`);
            return null;
        }
    } finally { //Fecha a session
        session.close();
    }
}
