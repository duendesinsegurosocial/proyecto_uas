import sql from 'mssql';

const config = {
  server: 'localhost',
  database: 'practicas_pruebas',
  options: {
    encrypt: false, // O true si usas Azure
    trustServerCertificate: true
  },
  authentication: {
    type: 'default',
    options: {
      userName: '', // En blanco si usas Windows Authentication
      password: '', // En blanco también
    }
  }
};

async function testConnection() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT 1 AS test');
    console.log('✅ Conexión exitosa:', result.recordset);
    await pool.close();
  } catch (err) {
    console.error('❌ Error al conectar:', err);
  }
}

testConnection();
