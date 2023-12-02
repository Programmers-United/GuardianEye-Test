const driver = require("../database/connectWithNeo4j");

module.exports.salvar = async function (title, type, coordinates) {
    var session = driver.session();

    try {
        // Cria e salva no banco
        const result = await session.run(
            "CREATE (:Ocorrence {title: $title, type: $type, location: point({latitude: $latitude, longitude: $longitude})})",
            {
                title: title,
                type: type,
                latitude: coordinates[1],  // Índice 1 é a latitude
                longitude: coordinates[0], // Índice 0 é a longitude
            }
        );
        console.log(`Nó com título '${title}' criado com sucesso.`);

    } catch (error) {
        console.error("Erro ao criar nó no Neo4j:", error);
    } finally {
        session.close();
    }
}

module.exports.remove = async function (title) {
    var session = driver.session();

    try {
        // Tenta encontrar o nó pelo título 
        const findNodeResult = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {title: $title}) RETURN n",
            {
                title,
            }
        );

        const node = findNodeResult.records[0].get("n");
        // Se o nó existe, remove suas propriedades
        if (node) {
            await session.run("MATCH (n:Ocorrence {title: $title}) DETACH DELETE n",
                {
                    title
                });

            console.log(`Nó com o título ${title} removido`);
        } else { //Se não
            console.log(`Nó com o título ${title} não existe`);
            return null;
        }
    } finally { //Fecha a session
        session.close();
    }
}

module.exports.update = async function (title, type, coordinates) {
    var session = driver.session();

    try {
        // Tenta encontrar o nó pelo título 
        const findNodeResult = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {title: $title}) RETURN n",
            {
                title,
            }
        );

        const node = findNodeResult.records[0].get("n");
        if (node) {
            // Se o nó existe, atualiza suas propriedades
            await session.run(
                "MATCH (n:Ocorrence {title: $title}) SET n.type = $type, n.location = point({latitude: $latitude, longitude: $longitude})",
                {
                    title,
                    type,
                    latitude: coordinates[1], // Índice 1 é a latitude
                    longitude: coordinates[0], // Índice 0 é a longitude
                }
            );

            console.log(`Nó com o título ${title} atualizado`);
        } else {
            console.log(`Nó com o título ${title} não existe`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao tentar atualizar o nó do Neo4j:", error);
    } finally {
        session.close();
    }
}

module.exports.relationType = async function (title) {
    var session = driver.session();

    try {
        // Encontra o nó correspondente ao título fornecido
        const result = await session.run(
            "OPTIONAL MATCH (n:Ocorrence {title: $title}) RETURN n",
            {
                title,
            }
        );

        const node = result.records[0].get("n");
        // Verifica se há algum nó encontrado
        if (!node) {
            console.log(`Nenhum nó encontrado com o título '${title}'.`);
            return;
        } else {
            if (node.properties.hasOwnProperty('type')) {
                const typeValue = node.properties.type;
                
                // Encontra nós com o mesmo tipo e cria relacionamentos
                const relacionamentosResult = await session.run(
                    "MATCH (origin:Ocorrence {title: $titulo}), (destino:Ocorrence) WHERE destino.type = $tipo AND destino.title <> $titulo " +
                    "CREATE (origin)-[:TYPE_RELATIONSHIP]->(destino)",
                    {
                        tipo: typeValue,
                        titulo: title,
                    }
                );

                console.log(`Relacionamentos criados com sucesso para '${title}'.`);
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