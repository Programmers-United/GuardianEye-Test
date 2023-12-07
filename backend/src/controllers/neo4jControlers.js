const driver = require("../database/connectWithNeo4j");

//Method for adding occurrences in Neo4j
module.exports.salvar = async function (id, title, type, coordinates) {
    var session = driver.session();

    try {
        // Cria e salva no banco
        const result = await session.run(
            "MERGE (:Ocorrence {id: $id, title: $title, type: $type, location: point({latitude: $latitude, longitude: $longitude})})",
            {
                id: id,
                title: title,
                type: type,
                latitude: coordinates[1],  // Índice 1 é a latitude
                longitude: coordinates[0], // Índice 0 é a longitude
            }
        );
        console.log(`Nó com id '${id}' criado com sucesso.`);

    } catch (error) {
        console.error("Erro ao criar nó no Neo4j:", error);
    } finally {
        session.close();
    }
}

//Method for deleting occurrences in Neo4j
module.exports.remove = async function (id) {
    var session = driver.session();

    try {
        // Tenta encontrar o nó pelo título 
        const findNodeResult = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {id: $id}) RETURN n",
            {
                id,
            }
        );

        const node = findNodeResult.records[0].get("n");
        // Se o nó existe, remove suas propriedades
        if (node) {
            await session.run("MATCH (n:Ocorrence {id: $id}) DETACH DELETE n",
                {
                    id
                });

            console.log(`Nó com o id ${id} removido`);
        } else { //Se não
            console.log(`Nó com o id ${id} não existe`);
            return null;
        }
    } finally { //Fecha a session
        session.close();
    }
}

//Method for updating occurrences in Neo4j
module.exports.update = async function (id, type, coordinates) {
    var session = driver.session();

    try {
        // Tenta encontrar o nó pelo título 
        const findNodeResult = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {id: $id}) RETURN n",
            {
                id,
            }
        );

        const node = findNodeResult.records[0].get("n");
        if (node) {
            // Se o nó existe, atualiza suas propriedades
            await session.run(
                "MATCH (n:Ocorrence {id: $id}) SET n.type = $type, n.location = point({latitude: $latitude, longitude: $longitude})",
                {
                    id,
                    type,
                    latitude: coordinates[1], // Índice 1 é a latitude
                    longitude: coordinates[0], // Índice 0 é a longitude
                }
            );

            console.log(`Nó com o id ${id} atualizado`);
        } else {
            console.log(`Nó com o id ${id} não existe`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao tentar atualizar o nó do Neo4j:", error);
    } finally {
        session.close();
    }
}

//Method for relation in the occurrences (Relation of equals types)
module.exports.relationType = async function (id) {
    var session = driver.session();

    try {
        // Encontra o nó correspondente ao título fornecido
        const result = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {id: $id}) RETURN n",
            {
                id,
            }
        );

        const node = result.records[0].get("n");
        // Verifica se há algum nó encontrado
        if (!node) {
            console.log(`Nenhum nó encontrado com o id '${id}'.`);
            return;
        } else {
            if (node.properties.hasOwnProperty('type')) {
                const typeValue = node.properties.type;
                
                // Encontra nós com o mesmo tipo e cria relacionamentos
                const relacionamentosResult = await session.run(
                    "MATCH (origin:Ocorrence {id: $id}), (destino:Ocorrence) WHERE destino.type = $tipo AND destino.id <> $id " +
                    "CREATE (origin)-[:TYPE_RELATIONSHIP]->(destino)" +
                    "CREATE (destino)-[:TYPE_RELATIONSHIP]->(origin)",
                    {
                        tipo: typeValue,
                        id: id,
                    }
                );

                console.log(`Relacionamentos criados com sucesso para '${id}'.`);
            } else {
                console.log(`O nó encontrado não possui a propriedade 'type'.`);
            }
        }
    } catch (error) {
        console.error("Erro ao criar relacionamentos no Neo4j:", error);
    } finally {
        session.close();
    }
};

//Method for relation in the occurrences (Relation of distance)
module.exports.relationDistance = async function (idOrigin, idDestino, distannce ){
    var session = driver.session();

    try {
     //Validar a existência de idOrigin
     const resultOrigin = await session.run(
        "OPTIONAL MATCH (origin:Ocorrence {id: $id}) RETURN origin",
        {
            id: idOrigin,
        }
    );

    //Validando a existência de idDestino
    const resultDestino = await session.run(
        "OPTIONAL MATCH (result:Ocorrence {id: $id}) RETURN result",
        {
            id: idDestino,
        }
    );

    const nodeOrigin = resultOrigin.records[0].get("origin");
    const nodeDestino = resultDestino.records[0].get("result");

    if (!nodeOrigin) {
        console.log(`Nenhum nó encontrado com o id '${idOrigin}'.`);
        return;
    }else{
        if (nodeDestino) {
            // Encontra nós com o mesmo tipo e cria relacionamentos
            const relacionamentosResult = await session.run(
                "MATCH (origin:Ocorrence {id: $id}), (destino:Ocorrence) WHERE destino.id = $desId AND destino.id <> $id " +
                "CREATE (origin)-[:PROXIMITY_RELATIONSHIP {atributo: $distance}]->(destino)" +
                "CREATE (destino)-[:PROXIMITY_RELATIONSHIP {atributo: $distance}]->(origin)",
                {
                    desId: idDestino,
                    id: idOrigin,
                    distance: distannce,
                }
            );
            console.log(`Relacionamentos de distância criado com sucesso para '${idOrigin}' e '${idDestino}'.`);
        }
    }
        
    } catch (error) {
        console.error("Erro ao criar relacionamentos no Neo4j:", error);
    } finally {
        session.close();
    }
}

//Function for return date of relation of proxy
module.exports.returnRelation = async function (id) {
    var session = driver.session();

    try {
        // Encontra nós relacionados por PROXIMITY_RELATIONSHIP
        const result = await session.run(
            "MATCH (origin:Ocorrence {id: $id})-[:PROXIMITY_RELATIONSHIP]->(destino:Ocorrence) " +
            "RETURN destino.id as id, destino.title as name, destino.location as posicao",
            {
                id: id,
            }
        );

        if (result.records.length === 0) {
            console.log(`Nenhum nó relacionado encontrado para a ocorrência '${id}'.`);
            return [];
        }

        const relacionados = result.records.map(record => ({
            id: record.get("id"),
            name: record.get("name"),
            posicao: record.get("posicao"),
        }));

        return relacionados;
    } catch (error) {
        console.error("Erro ao listar nós relacionados no Neo4j:", error);
    } finally {
        session.close();
    }    
}

//Fuction responsible for return dates of equal types
module.exports.returnRelationType = async function(id) {
    var session = driver.session();

    try {
        // Encontra todos os nós relacionados por TYPE_RELATIONSHIP
        const result = await session.run(
            "MATCH (origin:Ocorrence {id: $id})-[:TYPE_RELATIONSHIP]->(destino:Ocorrence) " +
            "RETURN destino.id as id, destino.title as name, destino.location as posicao, destino.type as tipo",
            {
                id: id,
            }
        );

        if (result.records.length === 0) {
            console.log(`Nenhum nó relacionado encontrado para a ocorrência '${id}'.`);
            return [];
        }

        const relacionados = result.records.map(record => ({
            id: record.get("id"),
            name: record.get("name"),
            posicao: record.get("posicao"),
            tipo: record.get("tipo"),
        }));

        return relacionados;
    } catch (error) {
        console.error("Erro ao obter dados dos nós relacionados no Neo4j:", error);
    } finally {
        session.close();
    }
}