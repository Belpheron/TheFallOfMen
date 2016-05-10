-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2016 a las 10:48:03
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.5.28

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
CREATE TABLE IF NOT EXISTS `attribute` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `ap` int(11) NOT NULL,
  `dp` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `cp` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `attribute`
--

INSERT INTO `attribute` (`id`, `ap`, `dp`, `hp`, `cp`) VALUES
(1, 5, 6, 10, 4),
(2, 7, 5, 8, 6),
(3, 5, 5, 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloqued`
--

DROP TABLE IF EXISTS `bloqued`;
CREATE TABLE IF NOT EXISTS `bloqued` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `iduserName` varchar(50) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'es foren',
  `idUserNameBloqued` varchar(50) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'es foren'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chatmessage`
--

DROP TABLE IF EXISTS `chatmessage`;
CREATE TABLE IF NOT EXISTS `chatmessage` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `date` datetime NOT NULL,
  `content` text COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameSender` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameReceiver` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `chatmessage`
--

INSERT INTO `chatmessage` (`id`, `date`, `content`, `idUserNameSender`, `idUserNameReceiver`) VALUES
(1, '2016-05-02 00:00:00', 'hola, como estas?', 'alumne', 'Daw2000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` int(11) NOT NULL,
  `iso` char(2) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
-- Estructura de tabla para la tabla `effect`
--

DROP TABLE IF EXISTS `effect`;
CREATE TABLE IF NOT EXISTS `effect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `turns` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `effect`
--

INSERT INTO `effect` (`id`, `name`, `description`, `turns`, `value`) VALUES
(1, 'attack effect', 'adds a bonus to aatack point', 1, 2),
(2, 'defense effect', 'adds a bonus to defense points', 1, 3),
(3, 'crtitical effect', 'adds a bonus to critical points', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `effectattribute`
--

DROP TABLE IF EXISTS `effectattribute`;
CREATE TABLE IF NOT EXISTS `effectattribute` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idEffect` int(11) NOT NULL,
  `idAttribute` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `effectattribute`
--

INSERT INTO `effectattribute` (`id`, `idEffect`, `idAttribute`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE IF NOT EXISTS `friend` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `iduserName` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `idUserNameFriend` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `friend`
--

INSERT INTO `friend` (`id`, `iduserName`, `idUserNameFriend`) VALUES
(1, 'alumne', 'Daw2000'),
(2, 'Daw2000', 'alumne');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `implant`
--

DROP TABLE IF EXISTS `implant`;
CREATE TABLE IF NOT EXISTS `implant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `buyPrice` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `implant`
--

INSERT INTO `implant` (`id`, `name`, `description`, `buyPrice`) VALUES
(1, 'green cristal implant', 'adds a bonus to attack attribute', 15),
(2, 'blue ruby implant', 'adds a bonus to defense attribute', 17),
(3, 'Yellow fiber implant', 'adds a bonus to critical attribute', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `implanteffect`
--

DROP TABLE IF EXISTS `implanteffect`;
CREATE TABLE IF NOT EXISTS `implanteffect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idImplant` int(11) NOT NULL,
  `idEffect` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `implanteffect`
--

INSERT INTO `implanteffect` (`id`, `idImplant`, `idEffect`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `infoanimations`
--

DROP TABLE IF EXISTS `infoanimations`;
CREATE TABLE IF NOT EXISTS `infoanimations` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `numFrames` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `infoanimations`
--

INSERT INTO `infoanimations` (`id`, `name`, `numFrames`) VALUES
(1, 'attack1', 76),
(2, 'attack2', 45),
(3, 'idle', 65);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `onlineusers`
--

DROP TABLE IF EXISTS `onlineusers`;
CREATE TABLE IF NOT EXISTS `onlineusers` (
  `id` int(11) NOT NULL,
  `idUser` varchar(150) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `lastName1` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `lastName2` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `birthDate` datetime NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `idCountry` int(11) NOT NULL COMMENT 'foren'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`id`, `name`, `lastName1`, `lastName2`, `birthDate`, `email`, `idCountry`) VALUES
(1, 'Juan', 'Montemayor', 'Escudero', '1982-03-30 00:00:00', 'belpheron82@gmail.com', 1),
(2, 'Franc', 'Sole', 'Gonzalez', '1986-07-15 00:00:00', 'srsole30687@gmail.com', 2),
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
(13, 'Pepito', 'Hola', '', '2016-05-01 00:00:00', 'pepito@gmail.com', 197);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotattribute`
--

DROP TABLE IF EXISTS `robotattribute`;
CREATE TABLE IF NOT EXISTS `robotattribute` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idAttribute` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotattribute`
--

INSERT INTO `robotattribute` (`id`, `idRobotStatistic`, `idAttribute`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotimplant`
--

DROP TABLE IF EXISTS `robotimplant`;
CREATE TABLE IF NOT EXISTS `robotimplant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idImplant` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotimplant`
--

INSERT INTO `robotimplant` (`id`, `idRobotStatistic`, `idImplant`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotskill`
--

DROP TABLE IF EXISTS `robotskill`;
CREATE TABLE IF NOT EXISTS `robotskill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idSkill` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotskill`
--

INSERT INTO `robotskill` (`id`, `idRobotStatistic`, `idSkill`) VALUES
(1, 1, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotskin`
--

DROP TABLE IF EXISTS `robotskin`;
CREATE TABLE IF NOT EXISTS `robotskin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotskin`
--

INSERT INTO `robotskin` (`id`, `name`, `description`) VALUES
(1, 'Mobot', 'Forged by the ancestor scientists, Mobot has the excellent mix between power and speed, resulting into a balanced robot. '),
(2, 'Prime', 'Descendant of one of the greatest robots in history, Prime is a very fast and agile robot, able to deal devastating attacks to the opponent.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotskininfoanimations`
--

DROP TABLE IF EXISTS `robotskininfoanimations`;
CREATE TABLE IF NOT EXISTS `robotskininfoanimations` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotSkin` int(11) NOT NULL,
  `idInfoAnimations` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotskininfoanimations`
--

INSERT INTO `robotskininfoanimations` (`id`, `idRobotSkin`, `idInfoAnimations`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstatistic`
--

DROP TABLE IF EXISTS `robotstatistic`;
CREATE TABLE IF NOT EXISTS `robotstatistic` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `level` int(11) NOT NULL,
  `experience` int(11) NOT NULL,
  `idRobotSkin` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `robotstatistic`
--

INSERT INTO `robotstatistic` (`id`, `name`, `level`, `experience`, `idRobotSkin`) VALUES
(1, 'robotron', 4, 1233, 0),
(2, 'mecabot', 5, 5433, 0),
(3, '0', 1, 1, 0),
(4, '0', 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstoreimplant`
--

DROP TABLE IF EXISTS `robotstoreimplant`;
CREATE TABLE IF NOT EXISTS `robotstoreimplant` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idImplant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robotstoreskill`
--

DROP TABLE IF EXISTS `robotstoreskill`;
CREATE TABLE IF NOT EXISTS `robotstoreskill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idRobotStatistic` int(11) NOT NULL,
  `idSkill` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `requiredLevel` int(11) NOT NULL,
  `buyPrice` int(11) NOT NULL,
  `multiplier` double NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `skill`
--

INSERT INTO `skill` (`id`, `name`, `description`, `requiredLevel`, `buyPrice`, `multiplier`) VALUES
(1, 'high powered attack', 'charges up a super attack', 1, 12, 1.4),
(2, 'leg hit', 'hits oppent''s leg', 3, 10, 1.2),
(3, 'fire shoot', 'fires  a charged shoot', 5, 9, 1.5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skilleffect`
--

DROP TABLE IF EXISTS `skilleffect`;
CREATE TABLE IF NOT EXISTS `skilleffect` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `idSkill` int(11) NOT NULL,
  `idEffect` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `skilleffect`
--

INSERT INTO `skilleffect` (`id`, `idSkill`, `idEffect`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
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
('alumne', 'c98a0d7fe575cc92f0cc931db5e31552', 80, 0, 1, 1, 1, 1),
('alumne2', '6b2703c4bcba1e9cad1c09a623daac68', 10, 0, 12, 4, 3, 1),
('all', 'nulo', 0, 0, 4, 3, 0, 1),
('Daw2000', '81dc9bdb52d04dc20036dbd8313ed055', 100, 0, 2, 2, 2, 1),
('pepito', '32164702f8ffd2b418d780ff02371e4c', 10, 0, 13, 5, 4, 1),
('provenAdmin123', '0192023a7bbd73250516f069df18b500', 0, 1, 3, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userstatistic`
--

DROP TABLE IF EXISTS `userstatistic`;
CREATE TABLE IF NOT EXISTS `userstatistic` (
  `id` int(11) NOT NULL COMMENT 'es la primary',
  `wins` int(11) NOT NULL,
  `defeats` int(11) NOT NULL,
  `totalInflictedDamage` int(11) NOT NULL,
  `totalRecivedDamage` int(11) NOT NULL,
  `totalWinCoins` int(11) NOT NULL,
  `totalExpendCoins` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `userstatistic`
--

INSERT INTO `userstatistic` (`id`, `wins`, `defeats`, `totalInflictedDamage`, `totalRecivedDamage`, `totalWinCoins`, `totalExpendCoins`) VALUES
(1, 15, 7, 12354, 11532, 532, 212),
(2, 22, 15, 32115, 5532, 231, 211),
(3, 0, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0, 0);

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
-- Indices de la tabla `robotskininfoanimations`
--
ALTER TABLE `robotskininfoanimations`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `bloqued`
--
ALTER TABLE `bloqued`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary';
--
-- AUTO_INCREMENT de la tabla `chatmessage`
--
ALTER TABLE `chatmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=247;
--
-- AUTO_INCREMENT de la tabla `effect`
--
ALTER TABLE `effect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `effectattribute`
--
ALTER TABLE `effectattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `implant`
--
ALTER TABLE `implant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `implanteffect`
--
ALTER TABLE `implanteffect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `infoanimations`
--
ALTER TABLE `infoanimations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `onlineusers`
--
ALTER TABLE `onlineusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `robotattribute`
--
ALTER TABLE `robotattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `robotimplant`
--
ALTER TABLE `robotimplant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `robotskill`
--
ALTER TABLE `robotskill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `robotskin`
--
ALTER TABLE `robotskin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `robotskininfoanimations`
--
ALTER TABLE `robotskininfoanimations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `robotstatistic`
--
ALTER TABLE `robotstatistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `robotstoreimplant`
--
ALTER TABLE `robotstoreimplant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary';
--
-- AUTO_INCREMENT de la tabla `robotstoreskill`
--
ALTER TABLE `robotstoreskill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary';
--
-- AUTO_INCREMENT de la tabla `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `skilleffect`
--
ALTER TABLE `skilleffect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `userstatistic`
--
ALTER TABLE `userstatistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'es la primary',AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
