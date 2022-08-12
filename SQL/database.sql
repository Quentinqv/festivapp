-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-vitoux-apptest.alwaysdata.net
-- Generation Time: Aug 12, 2022 at 01:37 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vitoux-apptest_festivapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 'J\'y étais, c\'était incroyable !', '2022-08-12 11:26:51', '2022-08-12 11:26:51'),
(2, 'Tellement hâte', '2022-08-12 11:27:21', '2022-08-12 11:27:21'),
(3, 'Merci !', '2022-08-12 11:28:58', '2022-08-12 11:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`userId`, `postId`) VALUES
(19, 1),
(19, 3),
(21, 1),
(21, 4);

-- --------------------------------------------------------

--
-- Table structure for table `nblike`
--

CREATE TABLE `nblike` (
  `nb` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nblike`
--

INSERT INTO `nblike` (`nb`, `postId`) VALUES
(2, 1),
(1, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `content`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 20, '{\"url\": [\"posts/ddpwugez6ougaa7oojgp\"]}', 'Premier évènement de la saison 2022 !\r\nMerci d\'avoir été au #RDV\r\n\r\n#rocknroll #music', '2022-08-12 10:46:53', '2022-08-12 13:05:52'),
(3, 20, '{\"url\": [\"posts/ulyfyze3rufufjhgercd\"]}', 'Incroyable évènement !', '2022-08-12 10:58:08', '2022-08-12 10:58:08'),
(4, 19, '{\"url\": [\"posts/qa7tcitb1om8dpnzrhk5\"]}', 'Haha j\'ai adoré ce festival\n\n#tomorroland', '2022-08-12 10:59:05', '2022-08-12 10:59:05'),
(5, 20, '{\"url\": [\"posts/ix31byjt8ubamiiz5blh\"]}', 'Prochain évènement le 20 août 2022\n\nSoyez présents ça va être le feu !', '2022-08-12 11:09:27', '2022-08-12 11:09:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `avatar` text NOT NULL,
  `role` enum('admin','personnal','professional','') NOT NULL,
  `categories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`categories`)),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `role`, `categories`, `createdAt`, `updatedAt`, `enabled`) VALUES
(19, 'Quentinqv', 'quentin.vitoux@gmail.com', '$2b$10$rcOOUWuMV00RzAotTKp8xOcWCv67MBazDmt/se3LjuM/L4IpQa0CS', 'avatars/e85dtgxjh5mnu2xqrsc8', 'personnal', NULL, '2022-07-31 12:09:53', '2022-08-12 13:09:59', 1),
(20, 'Tomorrowland', 'tomorrowland@gmail.com', '$2b$10$rcOOUWuMV00RzAotTKp8xOcWCv67MBazDmt/se3LjuM/L4IpQa0CS', 'avatars/tomorrowland_tse2lw', 'professional', NULL, '2022-08-06 11:06:45', '2022-08-12 12:02:25', 1),
(21, 'ElectroLover_off', 'electrolover@gmail.com', '$2b$10$rcOOUWuMV00RzAotTKp8xOcWCv67MBazDmt/se3LjuM/L4IpQa0CS', 'avatars/default', 'personnal', NULL, '2022-08-12 12:05:08', '2022-08-12 13:08:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_comment`
--

CREATE TABLE `user_has_comment` (
  `userId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_has_comment`
--

INSERT INTO `user_has_comment` (`userId`, `commentId`, `postId`) VALUES
(19, 1, 1),
(19, 2, 5),
(20, 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`userId`,`postId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `nblike`
--
ALTER TABLE `nblike`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_has_comment`
--
ALTER TABLE `user_has_comment`
  ADD PRIMARY KEY (`userId`,`commentId`,`postId`),
  ADD KEY `commentId` (`commentId`),
  ADD KEY `postId` (`postId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `nblike`
--
ALTER TABLE `nblike`
  ADD CONSTRAINT `nblike_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_has_comment`
--
ALTER TABLE `user_has_comment`
  ADD CONSTRAINT `user_has_comment_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`),
  ADD CONSTRAINT `user_has_comment_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `user_has_comment_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
