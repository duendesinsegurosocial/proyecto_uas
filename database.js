// database.js
import sql from 'mssql';

class Database {
  static _instance = null;
  _pool = null;

  // Configura aquí tu conexión (puedes también usar .env)
  _config = {
    user: '', // ← Déjalo vacío si usas Windows Authentication
    password: '', // ← También vacío
    server: 'localhost\\SQLEXPRESS', // Instancia SQL Server
    database: 'practicas_pruebas',
    options: {
      trustServerCertificate: true, // Importante para evitar errores SSL
    },
    // Usamos autenticación de Windows:
    authentication: {
      type: 'ntlm',
      options: {
        domain: '', // Puedes dejarlo vacío
        userName: '',
        password: ''
      }
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
      console.log("✅ Conectado a SQL Server");
    } catch (error) {
      console.error("❌ Error al conectar a SQL Server:", error);
    }
  }

  getConnection() {
    return this._pool;
  }

  async get_data(query, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: "",
      DATA: [],
    };

    try {
      if (!this._pool) {
        await this._createPool();
      }

      const request = this._pool.request();
      params.forEach((param, index) => {
        request.input(`param${index + 1}`, param);
      });

      const response = await request.query(query);
      result.STATUS = "OK";
      result.DATA = response.recordset;
    } catch (error) {
      result.ERROR = error.message;
    }

    return result;
  }

  async exec(query, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: "",
    };

    try {
      if (!this._pool) {
        await this._createPool();
      }

      const request = this._pool.request();
      params.forEach((param, index) => {
        request.input(`param${index + 1}`, param);
      });

      await request.query(query);
      result.STATUS = "OK";
    } catch (error) {
      result.ERROR = error.message;
    }

    return result;
  }
}

export default Database;
