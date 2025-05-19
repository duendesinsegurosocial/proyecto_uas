// Migración de PHP a Node.js - Ejemplos y patrones comunes

// Importaciones en Node.js (equivalente a require/include en PHP)
import fs from 'fs/promises';
import path from 'path';
import { createServer } from 'http';

console.log('=== MIGRACIÓN DE PHP A NODE.JS ===\n');

// EJEMPLO 1: Variables y tipos de datos
console.log('EJEMPLO 1: Variables y tipos de datos');
// PHP: $nombre = "Juan";
const nombre = "Juan";
console.log(`Variable en Node.js: ${nombre}`);

// PHP: $edad = 30;
const edad = 30;
console.log(`Variable numérica: ${edad}`);

// PHP: $activo = true;
const activo = true;
console.log(`Variable booleana: ${activo}`);

// PHP: $items = ["uno", "dos", "tres"];
const items = ["uno", "dos", "tres"];
console.log(`Array: ${items}`);

// PHP: $persona = ["nombre" => "Juan", "edad" => 30];
const persona = { nombre: "Juan", edad: 30 };
console.log(`Objeto (equivalente a array asociativo): ${JSON.stringify(persona)}`);
console.log('\n');

// EJEMPLO 2: Funciones
console.log('EJEMPLO 2: Funciones');
// PHP: function saludar($nombre) { return "Hola " . $nombre; }
function saludar(nombre) {
  return `Hola ${nombre}`;
}
console.log(saludar("María"));

// PHP: function sumar($a, $b = 5) { return $a + $b; }
function sumar(a, b = 5) {
  return a + b;
}
console.log(`Suma con valor por defecto: ${sumar(10)}`);
console.log('\n');

// EJEMPLO 3: Condicionales
console.log('EJEMPLO 3: Condicionales');
// PHP: if ($edad >= 18) { echo "Mayor de edad"; } else { echo "Menor de edad"; }
if (edad >= 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor de edad");
}

// PHP: $resultado = ($activo) ? "Está activo" : "No está activo";
const resultado = activo ? "Está activo" : "No está activo";
console.log(`Operador ternario: ${resultado}`);
console.log('\n');

// EJEMPLO 4: Bucles
console.log('EJEMPLO 4: Bucles');
// PHP: for ($i = 0; $i < 3; $i++) { echo $i; }
console.log("Bucle for:");
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// PHP: foreach ($items as $item) { echo $item; }
console.log("Bucle forEach (equivalente a foreach):");
items.forEach(item => {
  console.log(item);
});

// PHP: foreach ($persona as $clave => $valor) { echo "$clave: $valor"; }
console.log("Recorrer objeto (equivalente a foreach con clave-valor):");
Object.entries(persona).forEach(([clave, valor]) => {
  console.log(`${clave}: ${valor}`);
});
console.log('\n');

// EJEMPLO 5: Manejo de archivos
console.log('EJEMPLO 5: Manejo de archivos');
// PHP: $contenido = file_get_contents("archivo.txt");
async function manejoArchivos() {
  try {
    // Crear un archivo de prueba
    await fs.writeFile('archivo.txt', 'Este es un archivo de prueba');
    console.log("Archivo creado");
    
    // PHP: $contenido = file_get_contents("archivo.txt");
    const contenido = await fs.readFile('archivo.txt', 'utf8');
    console.log(`Contenido leído: ${contenido}`);
    
    // PHP: file_put_contents("archivo.txt", "Nuevo contenido");
    await fs.writeFile('archivo.txt', 'Nuevo contenido');
    console.log("Archivo actualizado");
    
    const nuevoContenido = await fs.readFile('archivo.txt', 'utf8');
    console.log(`Nuevo contenido: ${nuevoContenido}`);
    
    // Limpiar archivo de prueba
    await fs.unlink('archivo.txt');
    console.log("Archivo eliminado");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// EJEMPLO 6: Servidor HTTP básico
console.log('EJEMPLO 6: Servidor HTTP básico');
// PHP: 
/*
<?php
  echo "Hola Mundo";
?>
*/
function crearServidor() {
  const servidor = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hola Mundo');
  });
  
  // No iniciamos el servidor realmente, solo mostramos cómo se haría
  console.log(`En Node.js, crearías un servidor HTTP así:`);
  console.log(`servidor.listen(3000, () => {`);
  console.log(`  console.log('Servidor corriendo en http://localhost:3000');`);
  console.log(`});`);
}

// EJEMPLO 7: Conexión a base de datos (ejemplo conceptual)
console.log('\nEJEMPLO 7: Conexión a base de datos (ejemplo conceptual)');
console.log(`// PHP:
/*
$conexion = mysqli_connect("localhost", "usuario", "contraseña", "basedatos");
$resultado = mysqli_query($conexion, "SELECT * FROM usuarios");
while ($fila = mysqli_fetch_assoc($resultado)) {
  echo $fila['nombre'];
}
*/

// Node.js con MySQL:
import mysql from 'mysql2/promise';

async function conectarBD() {
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password: 'contraseña',
    database: 'basedatos'
  });
  
  const [filas] = await conexion.execute('SELECT * FROM usuarios');
  filas.forEach(fila => {
    console.log(fila.nombre);
  });
  
  await conexion.end();
}`);

// Ejecutar ejemplos asíncronos
async function ejecutarEjemplos() {
  await manejoArchivos();
  console.log('\n');
  crearServidor();
  
  console.log('\n=== DIFERENCIAS CLAVE ENTRE PHP Y NODE.JS ===');
  console.log('1. PHP es síncrono, Node.js es asíncrono por naturaleza');
  console.log('2. PHP tiene un ciclo de vida por petición, Node.js mantiene el estado entre peticiones');
  console.log('3. En PHP usas $variable, en Node.js usas let, const o var');
  console.log('4. PHP usa require/include, Node.js usa import/export');
  console.log('5. PHP tiene arrays asociativos, Node.js usa objetos');
  console.log('6. PHP usa echo/print, Node.js usa console.log');
  console.log('7. PHP tiene funciones globales, Node.js usa módulos');
}

ejecutarEjemplos();
