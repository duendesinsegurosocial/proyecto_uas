import sql from 'mssql';

class Database {
  static _instance;
  _pool = null;
  _config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'TuContraseña',
    server: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'practicas_pruebas',
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

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
      console.log('Conectado a SQL Server');
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