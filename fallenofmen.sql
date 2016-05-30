-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2016 a las 09:57:14
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fallenofmen`
--
CREATE DATABASE IF NOT EXISTS `fallenofmen` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `fallenofmen`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `attribute`
--

DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `iso` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `attribute`
--

INSERT INTO `attribute` (`id`, `name`, `iso`) VALUES
(1, 'Attack Points', 'ap'),
(2, 'Defense Points', 'dp'),
(3, 'Critical Points', 'cp'),
(4, 'Health Points', 'hp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloqued`
--

DROP TABLE IF EXISTS `bloqued`;
CREATE TABLE `bloqued` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `iduserName` varchar(50) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'es foren',
  `idUserNameBloqued` varchar(50) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'es foren'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chatmessage`
--

DROP TABLE IF EXISTS `chatmessage`;
CREATE TABLE `chatmessage` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `date` datetime NOT NULL,
  `content` text COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameSender` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameReceiver` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `chatmessage`
--

INSERT INTO `chatmessage` (`id`, `date`, `content`, `idUserNameSender`, `idUserNameReceiver`) VALUES
(1, '2016-05-25 15:02:45', 'hola pepito', 'juan4', 'pepito'),
(2, '2016-05-25 15:03:44', 'hola juan4', 'pepito', 'juan4'),
(3, '2016-05-25 15:03:49', 'jkhjh', 'pepito', 'all'),
(4, '2016-05-26 14:09:18', 'this is the end', 'pepito', 'all');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `iso` char(2) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `country`
--

INSERT INTO `country` (`id`, `iso`, `name`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CG', 'Congo'),
(50, 'CK', 'Cook Islands'),
(51, 'CR', 'Costa Rica'),
(52, 'HR', 'Croatia (Hrvatska)'),
(53, 'CU', 'Cuba'),
(54, 'CY', 'Cyprus'),
(55, 'CZ', 'Czech Republic'),
(56, 'DK', 'Denmark'),
(57, 'DJ', 'Djibouti'),
(58, 'DM', 'Dominica'),
(59, 'DO', 'Dominican Republic'),
(60, 'TP', 'East Timor'),
(61, 'EC', 'Ecuador'),
(62, 'EG', 'Egypt'),
(63, 'SV', 'El Salvador'),
(64, 'GQ', 'Equatorial Guinea'),
(65, 'ER', 'Eritrea'),
(66, 'EE', 'Estonia'),
(67, 'ET', 'Ethiopia'),
(68, 'FK', 'Falkland Islands (Malvinas)'),
(69, 'FO', 'Faroe Islands'),
(70, 'FJ', 'Fiji'),
(71, 'FI', 'Finland'),
(72, 'FR', 'France'),
(73, 'FX', 'France, Metropolitan'),
(74, 'GF', 'French Guiana'),
(75, 'PF', 'French Polynesia'),
(76, 'TF', 'French Southern Territories'),
(77, 'GA', 'Gabon'),
(78, 'GM', 'Gambia'),
(79, 'GE', 'Georgia'),
(80, 'DE', 'Germany'),
(81, 'GH', 'Ghana'),
(82, 'GI', 'Gibraltar'),
(83, 'GK', 'Guernsey'),
(84, 'GR', 'Greece'),
(85, 'GL', 'Greenland'),
(86, 'GD', 'Grenada'),
(87, 'GP', 'Guadeloupe'),
(88, 'GU', 'Guam'),
(89, 'GT', 'Guatemala'),
(90, 'GN', 'Guinea'),
(91, 'GW', 'Guinea-Bissau'),
(92, 'GY', 'Guyana'),
(93, 'HT', 'Haiti'),
(94, 'HM', 'Heard and Mc Donald Islands'),
(95, 'HN', 'Honduras'),
(96, 'HK', 'Hong Kong'),
(97, 'HU', 'Hungary'),
(98, 'IS', 'Iceland'),
(99, 'IN', 'India'),
(100, 'IM', 'Isle of Man'),
(101, 'ID', 'Indonesia'),
(102, 'IR', 'Iran (Islamic Republic of)'),
(103, 'IQ', 'Iraq'),
(104, 'IE', 'Ireland'),
(105, 'IL', 'Israel'),
(106, 'IT', 'Italy'),
(107, 'CI', 'Ivory Coast'),
(108, 'JE', 'Jersey'),
(109, 'JM', 'Jamaica'),
(110, 'JP', 'Japan'),
(111, 'JO', 'Jordan'),
(112, 'KZ', 'Kazakhstan'),
(113, 'KE', 'Kenya'),
(114, 'KI', 'Kiribati'),
(115, 'KP', 'Korea, Democratic People''s Republic of'),
(116, 'KR', 'Korea, Republic of'),
(117, 'XK', 'Kosovo'),
(118, 'KW', 'Kuwait'),
(119, 'KG', 'Kyrgyzstan'),
(120, 'LA', 'Lao People''s Democratic Republic'),
(121, 'LV', 'Latvia'),
(122, 'LB', 'Lebanon'),
(123, 'LS', 'Lesotho'),
(124, 'LR', 'Liberia'),
(125, 'LY', 'Libyan Arab Jamahiriya'),
(126, 'LI', 'Liechtenstein'),
(127, 'LT', 'Lithuania'),
(128, 'LU', 'Luxembourg'),
(129, 'MO', 'Macau'),
(130, 'MK', 'Macedonia'),
(131, 'MG', 'Madagascar'),
(132, 'MW', 'Malawi'),
(133, 'MY', 'Malaysia'),
(134, 'MV', 'Maldives'),
(135, 'ML', 'Mali'),
(136, 'MT', 'Malta'),
(137, 'MH', 'Marshall Islands'),
(138, 'MQ', 'Martinique'),
(139, 'MR', 'Mauritania'),
(140, 'MU', 'Mauritius'),
(141, 'TY', 'Mayotte'),
(142, 'MX', 'Mexico'),
(143, 'FM', 'Micronesia, Federated States of'),
(144, 'MD', 'Moldova, Republic of'),
(145, 'MC', 'Monaco'),
(146, 'MN', 'Mongolia'),
(147, 'ME', 'Montenegro'),
(148, 'MS', 'Montserrat'),
(149, 'MA', 'Morocco'),
(150, 'MZ', 'Mozambique'),
(151, 'MM', 'Myanmar'),
(152, 'NA', 'Namibia'),
(153, 'NR', 'Nauru'),
(154, 'NP', 'Nepal'),
(155, 'NL', 'Netherlands'),
(156, 'AN', 'Netherlands Antilles'),
(157, 'NC', 'New Caledonia'),
(158, 'NZ', 'New Zealand'),
(159, 'NI', 'Nicaragua'),
(160, 'NE', 'Niger'),
(161, 'NG', 'Nigeria'),
(162, 'NU', 'Niue'),
(163, 'NF', 'Norfolk Island'),
(164, 'MP', 'Northern Mariana Islands'),
(165, 'NO', 'Norway'),
(166, 'OM', 'Oman'),
(167, 'PK', 'Pakistan'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestine'),
(170, 'PA', 'Panama'),
(171, 'PG', 'Papua New Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Peru'),
(174, 'PH', 'Philippines'),
(175, 'PN', 'Pitcairn'),
(176, 'PL', 'Poland'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'RE', 'Reunion'),
(181, 'RO', 'Romania'),
(182, 'RU', 'Russian Federation'),
(183, 'RW', 'Rwanda'),
(184, 'KN', 'Saint Kitts and Nevis'),
(185, 'LC', 'Saint Lucia'),
(186, 'VC', 'Saint Vincent and the Grenadines'),
(187, 'WS', 'Samoa'),
(188, 'SM', 'San Marino'),
(189, 'ST', 'Sao Tome and Principe'),
(190, 'SA', 'Saudi Arabia'),
(191, 'SN', 'Senegal'),
(192, 'RS', 'Serbia'),
(193, 'SC', 'Seychelles'),
(194, 'SL', 'Sierra Leone'),
(195, 'SG', 'Singapore'),
(196, 'SK', 'Slovakia'),
(197, 'SI', 'Slovenia'),
(198, 'SB', 'Solomon Islands'),
(199, 'SO', 'Somalia'),
(200, 'ZA', 'South Africa'),
(201, 'GS', 'South Georgia South Sandwich Islands'),
(202, 'ES', 'Spain'),
(203, 'LK', 'Sri Lanka'),
(204, 'SH', 'St. Helena'),
(205, 'PM', 'St. Pierre and Miquelon'),
(206, 'SD', 'Sudan'),
(207, 'SR', 'Suriname'),
(208, 'SJ', 'Svalbard and Jan Mayen Islands'),
(209, 'SZ', 'Swaziland'),
(210, 'SE', 'Sweden'),
(211, 'CH', 'Switzerland'),
(212, 'SY', 'Syrian Arab Republic'),
(213, 'TW', 'Taiwan'),
(214, 'TJ', 'Tajikistan'),
(215, 'TZ', 'Tanzania, United Republic of'),
(216, 'TH', 'Thailand'),
(217, 'TG', 'Togo'),
(218, 'TK', 'Tokelau'),
(219, 'TO', 'Tonga'),
(220, 'TT', 'Trinidad and Tobago'),
(221, 'TN', 'Tunisia'),
(222, 'TR', 'Turkey'),
(223, 'TM', 'Turkmenistan'),
(224, 'TC', 'Turks and Caicos Islands'),
(225, 'TV', 'Tuvalu'),
(226, 'UG', 'Uganda'),
(227, 'UA', 'Ukraine'),
(228, 'AE', 'United Arab Emirates'),
(229, 'GB', 'United Kingdom'),
(230, 'US', 'United States'),
(231, 'UM', 'United States minor outlying islands'),
(232, 'UY', 'Uruguay'),
(233, 'UZ', 'Uzbekistan'),
(234, 'VU', 'Vanuatu'),
(235, 'VA', 'Vatican City State'),
(236, 'VE', 'Venezuela'),
(237, 'VN', 'Vietnam'),
(238, 'VG', 'Virgin Islands (British)'),
(239, 'VI', 'Virgin Islands (U.S.)'),
(240, 'WF', 'Wallis and Futuna Islands'),
(241, 'EH', 'Western Sahara'),
(242, 'YE', 'Yemen'),
(243, 'YU', 'Yugoslavia'),
(244, 'ZR', 'Zaire'),
(245, 'ZM', 'Zambia'),
(246, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duel_requests`
--

DROP TABLE IF EXISTS `duel_requests`;
CREATE TABLE `duel_requests` (
  `id` int(11) NOT NULL,
  `idSender` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `idReceiver` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `answer` int(11) NOT NULL,
  `fight_is_ready` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `effect`
--

DROP TABLE IF EXISTS `effect`;
CREATE TABLE `effect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `turns` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `target` varchar(15) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `effect`
--

INSERT INTO `effect` (`id`, `name`, `description`, `turns`, `value`, `target`) VALUES
(1, 'Light attack bonus', 'Light bonus to attack points', 1, 1, 'self'),
(2, 'Light defense bonus', 'Light bonus to defense points', 1, 1, 'self'),
(3, 'Light critical bonus', 'Light bonus to critical points', 1, 1, 'self'),
(4, 'Light heal', 'Light health point recovery', 1, 1, 'self'),
(5, 'Medium attack bonus', 'Medium bonus to attack', 1, 5, 'self'),
(6, 'Medium bonus to defense', 'Medium bonus to defense points', 1, 5, 'self'),
(7, 'Medium bonus to critical', 'Medium bonus to critical points', 1, 5, 'self'),
(8, 'Medium heal', 'Recovers health points by a medium amount', 1, 5, 'self'),
(9, 'Heavy attack bonus', 'Heavy bonus to attack points', 1, 10, 'self'),
(10, 'Heavy defense bonus', 'Heavy bonus to defense points', 1, 10, 'self'),
(11, 'Heavy critical bonus', 'Heavy bonus to critical points', 1, 10, 'self'),
(12, 'Heavy heal', 'Heavy health points recovery', 1, 10, 'self');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `effectattribute`
--

DROP TABLE IF EXISTS `effectattribute`;
CREATE TABLE `effectattribute` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idEffect` int(11) NOT NULL,
  `idAttribute` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `effectattribute`
--

INSERT INTO `effectattribute` (`id`, `idEffect`, `idAttribute`) VALUES
(5, 1, 1),
(6, 2, 2),
(7, 3, 3),
(8, 4, 4),
(9, 5, 1),
(10, 6, 2),
(11, 7, 3),
(12, 8, 4),
(13, 9, 1),
(14, 10, 2),
(15, 11, 3),
(16, 12, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fights`
--

DROP TABLE IF EXISTS `fights`;
CREATE TABLE `fights` (
  `id` int(11) NOT NULL,
  `p1_id` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_ap` int(11) NOT NULL,
  `p1_dp` int(11) NOT NULL,
  `p1_hp` int(11) NOT NULL,
  `p1_cp` int(11) NOT NULL,
  `p1_xp` int(11) NOT NULL,
  `p1_money` int(11) NOT NULL,
  `p1_skin` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack1_dmg` int(11) NOT NULL,
  `p1_attack1_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack1_value` int(11) NOT NULL,
  `p1_attack1_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack1_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack2_dmg` int(11) NOT NULL,
  `p1_attack2_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack2_value` int(11) NOT NULL,
  `p1_attack2_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack2_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack3_dmg` int(11) NOT NULL,
  `p1_attack3_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack3_value` int(11) NOT NULL,
  `p1_attack3_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p1_attack3_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_id` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_ap` int(11) NOT NULL,
  `p2_dp` int(11) NOT NULL,
  `p2_hp` int(11) NOT NULL,
  `p2_cp` int(11) NOT NULL,
  `p2_xp` int(11) NOT NULL,
  `p2_money` int(11) NOT NULL,
  `p2_skin` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack1_dmg` int(11) NOT NULL,
  `p2_attack1_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack1_value` int(11) NOT NULL,
  `p2_attack1_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack1_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack2_dmg` int(11) NOT NULL,
  `p2_attack2_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack2_value` int(11) NOT NULL,
  `p2_attack2_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack2_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack3_dmg` int(11) NOT NULL,
  `p2_attack3_attribute` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack3_value` int(11) NOT NULL,
  `p2_attack3_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `p2_attack3_description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `id_winner` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fights`
--

INSERT INTO `fights` (`id`, `p1_id`, `p1_ap`, `p1_dp`, `p1_hp`, `p1_cp`, `p1_xp`, `p1_money`, `p1_skin`, `p1_attack1_dmg`, `p1_attack1_attribute`, `p1_attack1_value`, `p1_attack1_name`, `p1_attack1_description`, `p1_attack2_dmg`, `p1_attack2_attribute`, `p1_attack2_value`, `p1_attack2_name`, `p1_attack2_description`, `p1_attack3_dmg`, `p1_attack3_attribute`, `p1_attack3_value`, `p1_attack3_name`, `p1_attack3_description`, `p2_id`, `p2_ap`, `p2_dp`, `p2_hp`, `p2_cp`, `p2_xp`, `p2_money`, `p2_skin`, `p2_attack1_dmg`, `p2_attack1_attribute`, `p2_attack1_value`, `p2_attack1_name`, `p2_attack1_description`, `p2_attack2_dmg`, `p2_attack2_attribute`, `p2_attack2_value`, `p2_attack2_name`, `p2_attack2_description`, `p2_attack3_dmg`, `p2_attack3_attribute`, `p2_attack3_value`, `p2_attack3_name`, `p2_attack3_description`, `id_winner`) VALUES
(11, 'alumne', 5, 5, 5, 5, 0, 0, 'mobot', 11, 'ap', 1, 'Light head hit', 'Light attack that hits the enemy in the head', 11, 'dp', 1, 'Light leg hit', 'Light attack that hits the enemy in the leg', 11, 'hp', 1, 'Light chest hit', 'Light attack that hits the enemy in the chest', 'pepito', 5, 5, 5, 5, 0, 0, 'mobot', 11, 'ap', 1, 'Light head hit', 'Light attack that hits the enemy in the head', 11, 'dp', 1, 'Light leg hit', 'Light attack that hits the enemy in the leg', 11, 'hp', 1, 'Light chest hit', 'Light attack that hits the enemy in the chest', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fight_events`
--

DROP TABLE IF EXISTS `fight_events`;
CREATE TABLE `fight_events` (
  `id` int(11) NOT NULL,
  `p1_id` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `p2_id` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `p1IsReady` int(11) DEFAULT NULL,
  `p2IsReady` int(11) DEFAULT NULL,
  `winner` int(11) DEFAULT NULL,
  `player1Action` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `player2Action` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `roundIsEnded` int(11) DEFAULT NULL,
  `roundNumber` int(11) DEFAULT NULL,
  `p1Health` int(11) DEFAULT NULL,
  `p2Health` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `fight_events`
--

INSERT INTO `fight_events` (`id`, `p1_id`, `p2_id`, `p1IsReady`, `p2IsReady`, `winner`, `player1Action`, `player2Action`, `roundIsEnded`, `roundNumber`, `p1Health`, `p2Health`) VALUES
(41, 'alumne', 'pepito', 0, 0, 0, 'null', 'null', NULL, NULL, 27, 37);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `iduserName` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameFriend` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `friend`
--

INSERT INTO `friend` (`id`, `iduserName`, `idUserNameFriend`) VALUES
(2, 'Daw2000', 'alumne'),
(3, 'pepito', 'alumne'),
(4, 'alumne', 'pepito'),
(5, 'srsole', 'Daw2000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `implant`
--

DROP TABLE IF EXISTS `implant`;
CREATE TABLE `implant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `buyPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `implant`
--

INSERT INTO `implant` (`id`, `name`, `description`, `buyPrice`) VALUES
(1, 'Light gem implant', 'Light bonus to attack points', 10),
(2, 'Light ruby implant', 'Light bonus to defense points', 12),
(3, 'Light crystal implant', 'Light bonus to health points', 13),
(4, 'Medium blue gem implant', 'Medium bonus to attack points', 23),
(5, 'Medium alirium implant', 'Medium bonus to defense points', 24),
(6, 'Medium Iritus implant', 'Medium bonus to health points', 27),
(7, 'Heavy Veldspar implant', 'Heavy bonus to attack points', 35),
(8, 'Heavy Scordite implant', 'Heavy bonus to defense points', 42),
(9, 'Heavy Iranium implant', 'Heavy bonus to health points', 57);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `implanteffect`
--

DROP TABLE IF EXISTS `implanteffect`;
CREATE TABLE `implanteffect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idImplant` int(11) NOT NULL,
  `idEffect` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `implanteffect`
--

INSERT INTO `implanteffect` (`id`, `idImplant`, `idEffect`) VALUES
(4, 1, 1),
(5, 2, 2),
(6, 3, 4),
(7, 4, 5),
(8, 5, 6),
(9, 6, 8),
(10, 7, 9),
(11, 8, 10),
(12, 9, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `infoanimations`
--

DROP TABLE IF EXISTS `infoanimations`;
CREATE TABLE `infoanimations` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idskin` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `numFrames` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `infoanimations`
--

INSERT INTO `infoanimations` (`id`, `idskin`, `name`, `numFrames`) VALUES
(1, 1, 'attack1', 27),
(2, 1, 'attack2', 27),
(4, 1, 'attack3', 25),
(5, 1, 'die', 13),
(6, 1, 'guard', 20),
(7, 1, 'hangar', 35),
(8, 1, 'hit', 12),
(9, 1, 'idle', 20),
(10, 1, 'stun', 24),
(11, 1, 'ultimate', 32),
(12, 1, 'win', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `onlineusers`
--

DROP TABLE IF EXISTS `onlineusers`;
CREATE TABLE `onlineusers` (
  `id` int(11) NOT NULL,
  `idUser` varchar(150) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `onlineusers`
--

INSERT INTO `onlineusers` (`id`, `idUser`) VALUES
(46, 'alumne');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `lastName1` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `lastName2` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `birthDate` datetime NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `idCountry` int(11) NOT NULL COMMENT 'foren'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`id`, `name`, `lastName1`, `lastName2`, `birthDate`, `email`, `idCountry`) VALUES
(1, 'Juan', 'Montemayor', 'Escudero', '1982-03-30 00:00:00', 'belpheron82@gmail.com', 1),
(2, 'Franc', 'Sole', 'Gonzalez', '1986-07-15 00:00:00', 'fsole@hotmail.com', 2),
(3, 'Eva', 'Fina', 'Segura', '1990-05-20 00:00:00', 'rosita@gmail.com', 3),
(4, 'all', 'all', NULL, '2016-05-01 00:00:00', 'all@all.com', 4),
(5, 'Jjklj', 'Jkljkj', 'Jklj', '2016-05-02 00:00:00', 'adfs@adsf.con', 202),
(6, 'Jkljlkj', 'Jlkjljk', 'Jjlkjlk', '2016-05-02 00:00:00', 'polla@adsf.com', 199),
(7, 'Jkljlkj', 'Jlkjljk', 'Jjlkjlk', '2016-05-02 00:00:00', 'polla@adsf.com', 199),
(8, 'Jkljlkj', 'Jlkjljk', 'Jjlkjlk', '2016-05-02 00:00:00', 'polla@adsf.com', 199),
(9, 'Jkljlkj', 'Jlkjljk', 'Jjlkjlk', '2016-05-02 00:00:00', 'polla@adsf.com', 199),
(10, 'Jkljlkj', 'Jlkjljk', 'Jjlkjlk', '2016-05-02 00:00:00', 'polla@adsf.com', 199),
(11, 'Jkjlj', 'Jkjlj', 'Jlkjk', '2016-05-03 00:00:00', 'adsf@asdf.com', 202),
(12, 'Jkjlj', 'Jkjlj', 'Jlkjk', '2016-05-03 00:00:00', 'adsf@asdf.com', 202),
(13, 'Pepito', 'Hola', '', '2016-05-01 00:00:00', 'pepito@gmail.com', 197),
(14, 'Francisco', 'Sole', 'Gonzalez', '2016-05-01 00:00:00', 'francxyolanda@hotmail.com', 202),
(15, 'Whuekcoh', 'Whuekcoh', 'Whuekcoh', '2009-08-12 00:00:00', 'a@a.aa', 202),
(16, 'Mojito', 'Juan andrez', '', '2016-05-11 00:00:00', 'lolazo@hotmail.com', 202),
(17, 'Polla', 'Patata', 'Joder', '2016-05-02 00:00:00', 'dsdsa@gmail.com', 201),
(18, 'Francisco', 'Figuereo', 'Moya', '2015-10-13 00:00:00', 'ffiguereo2@gmail.com', 202),
(19, 'Gerard', 'Romero', 'Arroyo', '2016-05-19 00:00:00', 'gerard.romero7@gmail.com', 202),
(20, 'Johan', 'Rodas', 'Morales', '2016-04-23 00:00:00', 'sebastian.rbcn@gmail.com', 202),
(21, 'Juan', 'Montemayor', 'Escuder', '2015-10-07 00:00:00', 'montemayor_bdt@hotmail.com', 150),
(22, 'Juan', 'Jklj', 'Jlkjlk', '2016-05-03 00:00:00', 'lkj@adsf.com', 201),
(23, 'Jlkj', 'Jkjkj', 'Jkjljl', '2016-05-02 00:00:00', 'lkj@adf.com', 202),
(24, 'Pedro', 'Picapiedra', '', '2016-05-03 00:00:00', 'lkj@adsf.com', 202),
(25, 'Jadf', 'Jkljlkj', '', '2016-05-20 00:00:00', 'asdf@adsf.com', 202);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotattribute`
--

DROP TABLE IF EXISTS `robotattribute`;
CREATE TABLE `robotattribute` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idAttribute` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotattribute`
--

INSERT INTO `robotattribute` (`id`, `idRobotStatistic`, `idAttribute`, `value`) VALUES
(1, 1, 1, 5),
(4, 1, 2, 5),
(5, 1, 3, 5),
(6, 1, 4, 5),
(7, 4, 1, 5),
(8, 4, 2, 5),
(9, 4, 3, 5),
(10, 4, 4, 5),
(11, 16, 1, 5),
(12, 16, 2, 5),
(13, 16, 3, 5),
(14, 16, 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotimplant`
--

DROP TABLE IF EXISTS `robotimplant`;
CREATE TABLE `robotimplant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idImplant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotskill`
--

DROP TABLE IF EXISTS `robotskill`;
CREATE TABLE `robotskill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `attack1_id` int(11) NOT NULL,
  `attack2_id` int(11) NOT NULL,
  `attack3_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotskill`
--

INSERT INTO `robotskill` (`id`, `idRobotStatistic`, `attack1_id`, `attack2_id`, `attack3_id`) VALUES
(1, 1, 1, 2, 3),
(3, 4, 1, 2, 3),
(4, 14, 1, 2, 3),
(5, 15, 1, 2, 3),
(6, 16, 1, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotskin`
--

DROP TABLE IF EXISTS `robotskin`;
CREATE TABLE `robotskin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotskin`
--

INSERT INTO `robotskin` (`id`, `name`, `description`) VALUES
(1, 'mobot', 'Forged by the ancestor scientists, Mobot has the excellent mix between power and speed, resulting into a balanced robot. '),
(2, 'prime', 'Descendant of one of the greatest robots in history, Prime is a very fast and agile robot, able to deal devastating attacks to the opponent.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstatistic`
--

DROP TABLE IF EXISTS `robotstatistic`;
CREATE TABLE `robotstatistic` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `level` int(11) NOT NULL,
  `experience` int(11) NOT NULL,
  `idRobotSkin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotstatistic`
--

INSERT INTO `robotstatistic` (`id`, `name`, `level`, `experience`, `idRobotSkin`) VALUES
(1, 'robotron', 4, 2558, 1),
(2, 'mecabot', 5, 5433, 0),
(3, '0', 1, 1, 0),
(4, '0', 1, 90, 1),
(5, '0', 1, 1, 2),
(6, '0', 1, 1, 2),
(7, '0', 1, 1, 2),
(8, '0', 1, 1, 2),
(9, '0', 1, 1, 2),
(10, '0', 1, 1, 2),
(11, '0', 1, 1, 2),
(12, '0', 1, 1, 2),
(13, '0', 1, 1, 1),
(14, 'juan2Tron', 1, 1, 1),
(15, 'juan3Tron', 1, 1, 1),
(16, 'juan4Tron', 1, 42, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstoreimplant`
--

DROP TABLE IF EXISTS `robotstoreimplant`;
CREATE TABLE `robotstoreimplant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idImplant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotstoreimplant`
--

INSERT INTO `robotstoreimplant` (`id`, `idRobotStatistic`, `idImplant`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 3),
(6, 4, 1),
(7, 4, 2),
(8, 4, 3),
(9, 14, 1),
(10, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstoreskill`
--

DROP TABLE IF EXISTS `robotstoreskill`;
CREATE TABLE `robotstoreskill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idSkill` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotstoreskill`
--

INSERT INTO `robotstoreskill` (`id`, `idRobotStatistic`, `idSkill`) VALUES
(1, 1, 1),
(2, 2, 2),
(7, 14, 1),
(8, 14, 2),
(9, 14, 3),
(10, 15, 1),
(11, 15, 2),
(12, 15, 3),
(13, 16, 1),
(14, 16, 2),
(15, 16, 3),
(16, 4, 1),
(17, 4, 2),
(18, 4, 3),
(19, 1, 2),
(20, 1, 3),
(21, 1, 4),
(22, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `requiredLevel` int(11) NOT NULL,
  `buyPrice` int(11) NOT NULL,
  `multiplier` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `skill`
--

INSERT INTO `skill` (`id`, `name`, `description`, `requiredLevel`, `buyPrice`, `multiplier`) VALUES
(1, 'Light head hit', 'Light attack that hits the enemy in the head', 1, 0, 1.1),
(2, 'Light leg hit', 'Light attack that hits the enemy in the leg', 1, 0, 1.1),
(3, 'Light chest hit', 'Light attack that hits the enemy in the chest', 1, 0, 1.1),
(4, 'Medium beam stroke', 'Medium beam attack that hits enemy defenses', 3, 20, 1.6),
(5, 'Medium hilt strike', 'Medium hilt strike that makes a hole in enemy chips', 4, 33, 2),
(6, 'Medium laser hit', 'Medium hit that does laser damage on enemy defenses', 5, 35, 2.2),
(7, 'Heavy satellite strike', 'Heavy strike with satellite bonus', 7, 40, 2.8),
(8, 'Heavy pulse laser hit', 'Uses laser power to drain enemy strengh', 8, 46, 3.3),
(9, 'Heavy hard finishing strike', 'Uses all remaining energy to strike enemy with the power core.', 9, 67, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skilleffect`
--

DROP TABLE IF EXISTS `skilleffect`;
CREATE TABLE `skilleffect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idSkill` int(11) NOT NULL,
  `idEffect` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `skilleffect`
--

INSERT INTO `skilleffect` (`id`, `idSkill`, `idEffect`) VALUES
(4, 1, 1),
(5, 2, 2),
(6, 3, 4),
(7, 5, 7),
(8, 6, 5),
(9, 4, 6),
(10, 7, 9),
(11, 8, 10),
(12, 9, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userName` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `coins` int(11) NOT NULL,
  `userType` int(11) NOT NULL,
  `idProfile` int(11) NOT NULL,
  `idUserStatistic` int(11) NOT NULL,
  `idRobotStatistic` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`userName`, `password`, `coins`, `userType`, `idProfile`, `idUserStatistic`, `idRobotStatistic`, `active`) VALUES
('alumne', 'c98a0d7fe575cc92f0cc931db5e31552', 638, 0, 1, 1, 1, 1),
('alumne2', '6b2703c4bcba1e9cad1c09a623daac68', 10, 0, 12, 4, 3, 1),
('all', 'nulo', 0, 0, 4, 3, 0, 1),
('Daw2000', 'faa320ce1968c190c880a54b27914f46', 100, 0, 2, 2, 2, 1),
('ffiguereo', '50aba55caaceacbe743a8cef5372c3cc', 10, 0, 18, 10, 9, 1),
('juan', 'a94652aa97c7211ba8954dd15a3cf838', 10, 0, 21, 13, 12, 1),
('juan1', 'e3a96c29002aed35295dc9c062e1f331', 10, 0, 22, 14, 13, 1),
('juan2', '3d81ce8c68f69bf6c36057b9b668b2ba', 61, 0, 23, 15, 14, 1),
('juan3', '7b5331875e44f1eb08619d8b95226a3f', 10, 0, 24, 16, 15, 1),
('juan4', '9c1f30eaf71c7e03307138106a071a13', 21, 0, 25, 17, 16, 1),
('Luigisalva', '81dc9bdb52d04dc20036dbd8313ed055', 10, 0, 17, 9, 8, 1),
('mojito', '6979c66655648273a3a2c8ab8b474ff7', 10, 0, 16, 8, 7, 1),
('pepito', '32164702f8ffd2b418d780ff02371e4c', 491, 0, 13, 5, 4, 1),
('provenAdmin123', '0192023a7bbd73250516f069df18b500', 0, 1, 3, 0, 0, 1),
('sebastian', '25d55ad283aa400af464c76d713c07ad', 10, 0, 20, 12, 11, 1),
('srsole', '80e77d999f423e6560ce579b07329d87', 10, 0, 14, 6, 5, 1),
('ttn7', '281d262fcff8cd4b44424ab183d763ec', 10, 0, 19, 11, 10, 1),
('Whuekcoh', '3a6d25ddefa7727e705c51be07a81115', 10, 0, 15, 7, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userstatistic`
--

DROP TABLE IF EXISTS `userstatistic`;
CREATE TABLE `userstatistic` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `wins` int(11) NOT NULL,
  `defeats` int(11) NOT NULL,
  `totalInflictedDamage` int(11) NOT NULL,
  `totalRecivedDamage` int(11) NOT NULL,
  `totalWinCoins` int(11) NOT NULL,
  `totalExpendCoins` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `userstatistic`
--

INSERT INTO `userstatistic` (`id`, `wins`, `defeats`, `totalInflictedDamage`, `totalRecivedDamage`, `totalWinCoins`, `totalExpendCoins`) VALUES
(1, 20, 17, 13123, 10098, 607, 0),
(2, 22, 15, 32115, 5532, 231, 211),
(3, 0, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0, 0),
(5, 18, 23, 10388, 13338, 491, 0),
(6, 0, 0, 0, 0, 0, 0),
(7, 0, 0, 0, 0, 0, 0),
(8, 0, 0, 0, 0, 0, 0),
(9, 0, 0, 0, 0, 0, 0),
(10, 0, 0, 0, 0, 0, 0),
(11, 0, 0, 0, 0, 0, 0),
(12, 0, 0, 0, 0, 0, 0),
(13, 0, 0, 0, 0, 0, 0),
(14, 0, 0, 0, 0, 0, 0),
(15, 0, 0, 0, 0, 0, 0),
(16, 0, 0, 0, 0, 0, 0),
(17, 1, 3, 215, 290, 11, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bloqued`
--
ALTER TABLE `bloqued`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `chatmessage`
--
ALTER TABLE `chatmessage`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `duel_requests`
--
ALTER TABLE `duel_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `effect`
--
ALTER TABLE `effect`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `effectattribute`
--
ALTER TABLE `effectattribute`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fights`
--
ALTER TABLE `fights`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fight_events`
--
ALTER TABLE `fight_events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `implant`
--
ALTER TABLE `implant`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `implanteffect`
--
ALTER TABLE `implanteffect`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `infoanimations`
--
ALTER TABLE `infoanimations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `onlineusers`
--
ALTER TABLE `onlineusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUser` (`idUser`);

--
-- Indices de la tabla `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotattribute`
--
ALTER TABLE `robotattribute`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotimplant`
--
ALTER TABLE `robotimplant`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotskill`
--
ALTER TABLE `robotskill`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotskin`
--
ALTER TABLE `robotskin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotstatistic`
--
ALTER TABLE `robotstatistic`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotstoreimplant`
--
ALTER TABLE `robotstoreimplant`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `robotstoreskill`
--
ALTER TABLE `robotstoreskill`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `skilleffect`
--
ALTER TABLE `skilleffect`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userName`);

--
-- Indices de la tabla `userstatistic`
--
ALTER TABLE `userstatistic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `attribute`
--
ALTER TABLE `attribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `bloqued`
--
ALTER TABLE `bloqued`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary';
--
-- AUTO_INCREMENT de la tabla `chatmessage`
--
ALTER TABLE `chatmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;
--
-- AUTO_INCREMENT de la tabla `duel_requests`
--
ALTER TABLE `duel_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `effect`
--
ALTER TABLE `effect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `effectattribute`
--
ALTER TABLE `effectattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `fights`
--
ALTER TABLE `fights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `fight_events`
--
ALTER TABLE `fight_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT de la tabla `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `implant`
--
ALTER TABLE `implant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `implanteffect`
--
ALTER TABLE `implanteffect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `infoanimations`
--
ALTER TABLE `infoanimations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `onlineusers`
--
ALTER TABLE `onlineusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `robotattribute`
--
ALTER TABLE `robotattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `robotimplant`
--
ALTER TABLE `robotimplant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary';
--
-- AUTO_INCREMENT de la tabla `robotskill`
--
ALTER TABLE `robotskill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `robotskin`
--
ALTER TABLE `robotskin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `robotstatistic`
--
ALTER TABLE `robotstatistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `robotstoreimplant`
--
ALTER TABLE `robotstoreimplant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `robotstoreskill`
--
ALTER TABLE `robotstoreskill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `skilleffect`
--
ALTER TABLE `skilleffect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `userstatistic`
--
ALTER TABLE `userstatistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary', AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
