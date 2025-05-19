import mysql from "mysql2/promise"

class Database {
  static _instance
  _connection = null
  _host = "localhost"
  _username = "root"
  _password = ""
  _database = "practicas_pruebas"

  /**
   * Get an instance of the Database
   * @return {Database} Instance
   */
  static getInstance() {
    if (!this._instance) {
      this._instance = new Database()
    }
    return this._instance
  }

  /**
   * Constructor - creates the connection pool
   */
  constructor() {
    this._createPool()
  }

  /**
   * Create the connection pool
   * @private
   */
  async _createPool() {
    try {
      this._connection = await mysql.createPool({
        host: this._host,
        user: this._username,
        password: this._password,
        database: this._database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      })
    } catch (error) {
      console.error("Failed to connect to MySQL:", error)
      throw error
    }
  }

  /**
   * Get connection pool
   * @returns {Pool} MySQL connection pool
   */
  getConnection() {
    return this._connection
  }

  /**
   * Execute a query and return data
   * @param {string} sql - SQL query to execute
   * @param {Array} params - Parameters for prepared statement
   * @returns {Promise<Object>} - Result object with STATUS, ERROR, and DATA
   */
  async get_data(sql, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: "",
      DATA: [],
    }

    try {
      if (!this._connection) {
        await this._createPool()
      }

      const [rows] = await this._connection.execute(sql, params)
      result.STATUS = "OK"
      result.DATA = rows
    } catch (error) {
      result.ERROR = error.message
    }

    return result
  }

  /**
   * Execute a query without returning data
   * @param {string} sql - SQL query to execute
   * @param {Array} params - Parameters for prepared statement
   * @returns {Promise<Object>} - Result object with STATUS and ERROR
   */
  async exec(sql, params = []) {
    const result = {
      STATUS: "ERROR",
      ERROR: "",
    }

    try {
      if (!this._connection) {
        await this._createPool()
      }

      await this._connection.execute(sql, params)
      result.STATUS = "OK"
    } catch (error) {
      result.ERROR = error.message
    }

    return result
  }
}

export default Database
