-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql307.infinityfree.com
-- Tiempo de generación: 07-04-2025 a las 12:24:00
-- Versión del servidor: 10.6.19-MariaDB
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `if0_38008177_practicas_pruebas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `maestro` int(11) DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `materia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombre`, `apellido`, `telefono`, `correo`, `maestro`, `carrera`, `materia`) VALUES
(123, 'asesor 1', 'uno', '789456', 'asesor@mail.com', 123, 'ITSE', '132'),
(456, 'asesor 2', 'dos', '789456', 'asesor@mail.com', 456, 'Informatica', '456'),
(789, 'asesor 3', 'tres', '789456', 'asesor@mail.com', 789, 'InformaticaVirtual', '789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestros`
--

CREATE TABLE `maestros` (
  `id_maestro` int(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `materia` varchar(100) NOT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `telefono` int(100) NOT NULL,
  `correo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maestros`
--

INSERT INTO `maestros` (`id_maestro`, `nombres`, `apellidos`, `materia`, `carrera`, `telefono`, `correo`) VALUES
(1, 'aaaaaaaaaaaaaa', 'bbbbbbbbbbb', '456', 'Informatica', 231231231, 'fbojorquez@ceus.edu.mx'),
(123, '', '', '132', '', 0, ''),
(456, 'maestra 2', 'dos', '132', 'Informatica', 879456, 'maestro@mail.com'),
(789, 'maestra 3', 'tres', '789', 'InformaticaVirtual', 879456, 'maestro@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id_materia` int(50) NOT NULL,
  `nombre_materia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id_materia`, `nombre_materia`) VALUES
(132, 'informatica'),
(456, 'word'),
(789, 'exel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id_alumno` int(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `asesor` varchar(100) NOT NULL,
  `materia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id_alumno`, `nombres`, `apellidos`, `carrera`, `asesor`, `materia`) VALUES
(123, 'soli 1', 'uno', 'ITSE', '123', '132'),
(456, 'soli 2', 'dos', 'Informatica', '456', '456'),
(789, 'soli 3', 'tres', 'InformaticaVirtual', '789', '789');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`),
  ADD KEY `fk_alumnos_maestros` (`maestro`);

--
-- Indices de la tabla `maestros`
--
ALTER TABLE `maestros`
  ADD PRIMARY KEY (`id_maestro`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id_materia`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `fk_alumnos_maestros` FOREIGN KEY (`maestro`) REFERENCES `maestros` (`id_maestro`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
