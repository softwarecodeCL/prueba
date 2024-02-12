const { fetchDataFromDB } = require('./lambdaFunctions.js');

exports.handler = async function(event, context) {
  try {
    const queryParams = event.queryStringParameters;
    let searchTerm = null;
    
    if (queryParams) {
      searchTerm = queryParams.q;
    }

    console.log("Intentando obtener datos...");
    const data = await fetchDataFromDB(searchTerm);

    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};
