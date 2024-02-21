-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 20 fév. 2024 à 23:36
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
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 's@gmail.com', 'd'),
(2, 'ss@gmail.com', 'dd'),
(3, NULL, 'tt@gmail.com'),
(4, NULL, 'm@gmail.com'),
(5, NULL, 'test@gmail.com'),
(6, 'test2@gmail.com', '$2b$10$GPI7chDBPQVjJgwoz.dBPuvzG98wV92GRPUuxKbJwSYmKtWduKrfK'),
(7, 'test25@gmail.com', '$2b$10$A4/7aTJTd1a.yWj5S99.OO0i2q4IppVc1e6IRqXz9ZUCAmUfW.1z6'),
(8, 'test26@gmail.com', '$2b$10$jnFlVmnFD0yBh2kF3pfVq.rqRw/Bn03DWVodCPiW0jLpofEn2Edc2'),
(9, 'test27@gmail.com', '$2b$10$.TR5mdYIRwVl4AffXVS00uslgx7DUZ.DbfAy5sooomPnNeg3F3Fvy'),
(10, 'test28@gmail.com', '$2b$10$VZ/Iaj848OV/NZ8vSxS0EOZNd0b3Gw2tEBScMu3HH.mB8GUcEnggu'),
(11, 'test29@gmail.com', '$2b$10$Rf.9Mz0WCBqsDCIW8wi9NuyPSoZYIl1WLVYfrIJvm/J6OSXTk.66e'),
(12, 'test30@gmail.com', '$2b$10$PMsJujIgWmtMFI3mzi/W/.Se5J.kgU7ku.J.i2VN7qZlroJzPcaTe'),
(13, 'test30@gmail.com', '$2b$10$Vez.8F1PSbqYO4MNGsN/he6.NRyhfcFe04xfdmrLlHCSN2Ra6pake'),
(14, 'gg@gmail.com', '$2b$10$ycBvycodWcIThwAAH5090ODNuvHy3OMhj3c/0xE/f3hyBNz1qDhPS'),
(15, 'mag@gmail.com', '$2b$10$CFjLe841ewRRxBxwvDun0.8iz/SPD4D.Ih7zj7CZ2g5wMbiXZWnPW'),
(16, 'tes@gmail.com', '$2b$10$izcOgz2it0nxI6ZlkjR8q.uP993EiTDqX28zqVBPxfu0mGCeofCYG'),
(17, 'tb@gmail.com', '$2b$10$uriVPKLBNPujPM8hIuFgAOCRLa28AcEuJ5HP8GBYJPD2bXVXZQQBe');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
