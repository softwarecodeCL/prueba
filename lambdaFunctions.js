const { Client } = require('pg');
const dbConfig = require('./bd/bd');

let client;

async function getClientInstance() {
  if (!client || !client._connected) {
    client = new Client(dbConfig);
    await client.connect();
  }
  return client;
}

async function fetchDataFromDB(searchTerm) {
  try {
    const dbClient = await getClientInstance();

    let query = 'SELECT * FROM pois';

    if (searchTerm) {
      const cleanSearchTerm = searchTerm.trim().toLowerCase();
      query += ` WHERE LOWER(name) ILIKE '%${cleanSearchTerm}%' OR LOWER(category_name) ILIKE '%${cleanSearchTerm}%'`;
    }

    const res = await dbClient.query(query);

    return res.rows;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw new Error(`Error al conectar a la base de datos: ${error.message}`);
  }
}

module.exports = {
  fetchDataFromDB
};
