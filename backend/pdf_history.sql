-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 20 fév. 2024 à 23:33
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `testpdf`
--

-- --------------------------------------------------------

--
-- Structure de la table `pdf_history`
--

DROP TABLE IF EXISTS `pdf_history`;
CREATE TABLE IF NOT EXISTS `pdf_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pdf_history`
--

INSERT INTO `pdf_history` (`id`, `filename`) VALUES
(1, 'ttv_bbv.pdf'),
(2, 'ttv_bbv.pdf'),
(3, 'ttvm_bbvtt.pdf'),
(4, 'ttvm_bbvtt.pdf'),
(5, 'ttvm'),
(6, 'dfg.pdf'),
(7, 'dfg.pdf'),
(8, 'dfg.pdf'),
(9, 'dfg.pdf'),
(10, 'dfg.pdf'),
(11, 'dfg.pdf'),
(12, 'dfg.pdf'),
(13, 'dfgsqdfg.pdf'),
(14, 'f'),
(15, 'fbvn'),
(16, 'http://localhost:5000/generate-pdf/moj.pdf'),
(17, 'http://localhost:5000/pdf/vcg.pdf'),
(18, 'http://localhost:5000/generate-pdf/vcg.pdf'),
(19, 'http://localhost:5000/pdfs/qsdfg.pdf'),
(20, 'http://localhost:5000/qsdfgdfdvbn.pdf'),
(21, 'http://localhost:5000/opmm.pdf'),
(22, 'http://localhost:5000/edfretghnj.pdf');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
