const neo4j = require("neo4j-driver");
const dotonev = require('dotenv');
dotonev.config();
var driver;

(async () => {
    try {
        driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD))
        const serverInfo = await driver.getServerInfo()
        console.log('Connection established')
        console.log(serverInfo)
    } catch (err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    }
})();

module.exports = driver;
