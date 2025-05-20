import sql from 'mssql/msnodesqlv8.js';

class Database {
  static _instance;
  _pool = null;
  _config = {
    server: 'localhost\\SQLEXPRESS', // Cambia esto si tu servidor tiene otro nombre
    database: 'practicas_pruebas',
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true,
      trustServerCertificate: true
    }
  };
  
  // El resto del código sigue igual...

  static getInstance() {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }

  constructor() {
    this._createPool();
  }

  async _createPool() {
    try {
      this._pool = await sql.connect(this._config);
      console.log('Conectado a SQL Server con Windows Authentication');
    } catch (error) {
      console.error('Error al conectar a SQL Server:', error);
      throw error;
    }
  }

  getPool() {
    return this._pool;
  }

  async get_data(sqlQuery, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: "",
      DATA: []
    };

    try {
      if (!this._pool) {
        await this._createPool();
      }

      const request = this._pool.request();
      
      // Añadir parámetros si existen
      if (params.length > 0) {
        params.forEach((param, index) => {
          request.input(`param${index}`, param);
          // Reemplazar ? con @paramX en la consulta
          sqlQuery = sqlQuery.replace('?', `@param${index}`);
        });
      }

      const data = await request.query(sqlQuery);
      result.STATUS = "OK";
      result.DATA = data.recordset;
    } catch (error) {
      result.ERROR = error.message;
    }

    return result;
  }

  async exec(sqlQuery, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: ""
    };

    try {
      if (!this._pool) {
        await this._createPool();
      }

      const request = this._pool.request();
      
      // Añadir parámetros si existen
      if (params.length > 0) {
        params.forEach((param, index) => {
          request.input(`param${index}`, param);
          // Reemplazar ? con @paramX en la consulta
          sqlQuery = sqlQuery.replace('?', `@param${index}`);
        });
      }

      await request.query(sqlQuery);
      result.STATUS = "OK";
    } catch (error) {
      result.ERROR = error.message;
    }

    return result;
  }
}

export default Database;