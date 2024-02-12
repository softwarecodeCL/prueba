const dbConfig = {
    user: process.env.USR,
    host: process.env.HOST,
    database: process.env.BD,
    password: process.env.PSW,
    port: process.env.PORT,
  };
  
  module.exports = dbConfig;