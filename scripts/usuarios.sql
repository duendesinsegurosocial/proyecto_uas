CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un usuario administrador por defecto
-- Contraseña: admin123 (hasheada con bcrypt)
INSERT INTO usuarios (username, password, nombre, rol)
VALUES ('admin', '$2a$10$XFAv9JE5wdYYbPdV4O0Zb.wWg1vwl9uGVkxQ7qEJRNmtpICnTJ4Uy', 'Administrador', 'admin');


Estructura de tabla para la tabla `alumnos`
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


