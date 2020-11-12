-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.40-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for j_post
CREATE DATABASE IF NOT EXISTS `j_post` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `j_post`;

-- Dumping structure for table j_post.research_focus
CREATE TABLE IF NOT EXISTS `research_focus` (
  `research_focus_id` int(2) NOT NULL,
  `research_focus_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`research_focus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table j_post.research_focus: ~9 rows (approximately)
/*!40000 ALTER TABLE `research_focus` DISABLE KEYS */;
INSERT INTO `research_focus` (`research_focus_id`, `research_focus_name`) VALUES
	(1, 'ปฐมวัย'),
	(2, 'ประฐม1-3'),
	(3, 'ประฐม4-6'),
	(4, 'มัธยม1-3'),
	(5, 'มัธยม4-6'),
	(6, 'บริหาร'),
	(7, 'บริหาร1'),
	(8, 'บริหาร2'),
	(9, 'วคต.602A');
/*!40000 ALTER TABLE `research_focus` ENABLE KEYS */;

-- Dumping structure for table j_post.research_list
CREATE TABLE IF NOT EXISTS `research_list` (
  `research_id` int(50) NOT NULL AUTO_INCREMENT,
  `userid` int(50) NOT NULL DEFAULT '0',
  `research_head` longtext,
  `research_history` longtext,
  `research_goal` longtext,
  `research_abstract_eng` longtext,
  `research_abstract_thai_keyword` longtext,
  `research_tester` longtext,
  `research_abstract_eng_keyword` longtext,
  `research_tool` longtext,
  `research_how` longtext,
  `research_result` longtext,
  `research_abstract` longtext,
  `research_focus_id` int(2) NOT NULL DEFAULT '0',
  `research_year` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`research_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table j_post.research_list: ~1 rows (approximately)
/*!40000 ALTER TABLE `research_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `research_list` ENABLE KEYS */;

-- Dumping structure for table j_post.users
CREATE TABLE IF NOT EXISTS `users` (
  `userid` int(50) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_firstname` varchar(255) DEFAULT NULL,
  `user_lastname` varchar(255) DEFAULT NULL,
  `user_role` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table j_post.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userid`, `email`, `password`, `user_firstname`, `user_lastname`, `user_role`) VALUES
	(11, 'ejs@gmail.com', '123456', 'BOB', 'KA', '4');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
