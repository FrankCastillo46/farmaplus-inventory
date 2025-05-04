-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 04-05-2025 a las 23:46:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmaplus_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `umbral_alerta` int(11) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `created_at`, `umbral_alerta`) VALUES
(1, 'Paracetamol 500mg', 'Analgésico y antipirético utilizado para aliviar dolores leves a moderados.', 12.99, 12, '2025-05-03 18:43:24', 20),
(2, 'Ibuprofeno 400 mg', 'Antiinflamatorio y analgésico', 3.50, 30, '2025-05-03 22:03:44', 5),
(9, 'Amoxicilina 500 mg', 'Antibiótico para infecciones bacterianas', 18.00, 44, '2025-05-03 22:37:44', 5),
(10, 'Loratadina 10 mg', 'Antihistamínico para alergias', 6.90, 19, '2025-05-03 22:37:44', 4),
(11, 'Omeprazol 20 mg', 'Protector gástrico', 10.00, 18, '2025-05-03 22:37:44', 6),
(12, 'Metformina 850 mg', 'Tratamiento para la diabetes tipo 2', 15.50, 43, '2025-05-03 22:37:44', 5),
(13, 'Salbutamol Inhalador', 'Broncodilatador para asma', 22.50, 15, '2025-05-03 22:37:44', 3),
(14, 'Ácido Fólico 5 mg', 'Suplemento vitamínico', 7.80, 66, '2025-05-03 22:37:44', 10),
(15, 'Diclofenaco 75 mg', 'Antiinflamatorio y analgésico', 9.20, 23, '2025-05-03 22:37:44', 5),
(16, 'Ranitidina 150 mg', 'Alivio de acidez estomacal', 11.00, 0, '2025-05-03 22:37:44', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','cajero') NOT NULL DEFAULT 'cajero',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `password`, `rol`, `created_at`) VALUES
(1, 'admin', '$2b$06$uaJRxO7eg4QP6cHBYicHpeS.WfVUW7hqGIJxEyK6xrFQ.A17waURy', 'admin', '2025-05-04 05:12:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `producto_id`, `cantidad`, `total`, `fecha`) VALUES
(2, 1, 2, 25.00, '2025-05-02 05:00:00'),
(3, 1, 4, 51.96, '2025-05-03 05:00:00'),
(4, 1, 1, 12.99, '2025-05-03 05:00:00'),
(5, 1, 1, 12.99, '2025-05-04 05:00:00'),
(6, 11, 20, 200.00, '2025-05-04 05:00:00'),
(7, 1, 1, 12.99, '2025-05-04 05:00:00'),
(8, 1, 1, 12.99, '2025-05-04 05:00:00'),
(9, 1, 1, 12.99, '2025-05-04 05:00:00'),
(10, 10, 4, 27.60, '2025-05-04 05:00:00'),
(11, 12, 7, 108.50, '2025-05-04 05:00:00'),
(12, 15, 11, 101.20, '2025-05-04 05:00:00'),
(13, 16, 10, 110.00, '2025-05-04 05:00:00'),
(14, 16, 20, 220.00, '2025-05-04 05:00:00'),
(15, 16, 1, 11.00, '2025-05-04 05:00:00'),
(16, 16, 2, 22.00, '2025-05-04 05:00:00'),
(17, 9, 1, 18.00, '2025-05-04 05:00:00'),
(18, 14, 1, 7.80, '2025-05-04 05:00:00'),
(19, 12, 1, 15.50, '2025-05-04 05:00:00'),
(20, 9, 23, 414.00, '2025-05-04 05:00:00'),
(21, 12, 9, 139.50, '2025-05-04 05:00:00'),
(22, 11, 1, 10.00, '2025-05-04 05:00:00'),
(23, 9, 12, 216.00, '2025-05-04 05:00:00'),
(24, 14, 1, 7.80, '2025-05-04 05:00:00'),
(25, 14, 1, 7.80, '2025-05-04 05:00:00'),
(26, 14, 1, 7.80, '2025-05-04 05:00:00'),
(27, 15, 1, 9.20, '2025-05-04 05:00:00'),
(28, 16, 1, 11.00, '2025-05-04 05:00:00'),
(29, 11, 1, 10.00, '2025-05-04 05:00:00'),
(30, 10, 2, 13.80, '2025-05-04 05:00:00'),
(31, 9, 3, 54.00, '2025-05-04 05:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
