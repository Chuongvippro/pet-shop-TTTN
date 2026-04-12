-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: petshop
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Thức ăn','Các loại thức ăn cho chó mèo','active'),(2,'Phụ kiện','Bát ăn, đồ chơi, phụ kiện thú cưng','active'),(3,'Cát vệ sinh','Cát vệ sinh dành cho mèo','active'),(4,'Chuồng','Chuồng, nhà cho thú cưng','active'),(5,'Dây dẫn','Dây dắt, dây xích cho chó mèo','active');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (8,'óc chó','Thức ăn dinh dưỡng cho chó mọi độ tuổi',180000.00,50,1,'2026-04-10 13:27:57','2026-04-10 15:20:21','active'),(9,'Pate mèo Whiskas','Pate mềm thơm ngon cho mèo trưởng thành',25000.00,100,1,'2026-04-10 13:27:57','2026-04-10 13:27:57','active'),(10,'Vòng cổ chó có đèn LED','Vòng cổ an toàn phát sáng ban đêm',120000.00,30,2,'2026-04-10 13:27:57','2026-04-10 13:27:57','active'),(11,'Nhà ngủ cho mèo mini','Ổ ngủ êm ái cho mèo, chất liệu vải mềm',350000.00,15,2,'2026-04-10 13:27:57','2026-04-10 13:27:57','active'),(12,'Cát vệ sinh cho mèo 5kg','Cát hút ẩm khử mùi hiệu quả',90000.00,80,3,'2026-04-10 13:27:57','2026-04-10 13:27:57','active'),(13,'22121','11eada',12311.00,111,3,'2026-04-10 13:52:16','2026-04-10 15:16:08','active'),(14,'111','11111111',222111.00,22222,2,'2026-04-10 15:12:11','2026-04-10 15:14:05','active');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (41,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTg5MDM4NSwiZXhwIjoxNzc2NDk1MTg1fQ.1Iq9KJE57Ybq8YcpXWTIUYd0ddPs6qmjXEO0l_5GP30','2026-04-18 13:53:05','2026-04-11 06:53:06'),(42,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTg5MTEyMywiZXhwIjoxNzc2NDk1OTIzfQ.rQ4ThBbquRt6XjkaDIu_jKgcYuIhOVPuRYS2SBMcvuc','2026-04-18 14:05:24','2026-04-11 07:05:25'),(43,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTkyNDM3MywiZXhwIjoxNzc2NTI5MTczfQ.GpDBXGyowQ_jLv_GCcEmQ3Spt6EXHiPJb-etWtNF2OI','2026-04-18 23:19:33','2026-04-11 16:19:33'),(47,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTk2NTU0MiwiZXhwIjoxNzc2NTcwMzQyfQ.w3V79uy8sncGJjCCTt9V39hd3Y2NAsscr_DIeV1QAbo','2026-04-19 10:45:43','2026-04-12 03:45:42'),(49,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTk3NTI3OSwiZXhwIjoxNzc2NTgwMDc5fQ.rBvm_gdL9VgoKv_X6yqX67O2efJ8qODviyupFmF8OBA','2026-04-19 13:28:00','2026-04-12 06:27:59'),(50,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTk3NTQxNSwiZXhwIjoxNzc2NTgwMjE1fQ.IeO5NPFffamVCiKtENw7Z9saS3vtzzCK15jB6pNrcnM','2026-04-19 13:30:16','2026-04-12 06:30:15');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `role` enum('admin','user') DEFAULT 'user',
  `status` enum('active','banned') DEFAULT 'active',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'chuongvippro123','123@gmail.com','$2b$10$2Q4ttK5xTFWRPWXvZAacj.i7X3F8IQg6Zajt9zNUNerxip/GJ.sOi',NULL,NULL,'user','active',0,NULL),(3,'chuongvippro123','12345@gmail.com','$2b$10$e4w7PvsMn5I/p9hGHvu2VOTuOqsw2RvpC.kcSzSZvqAIUrLO1X1hO',NULL,NULL,'user','active',0,NULL),(4,'chuongvippro123','12345777@gmail.com','$2b$10$KcjeeAHaEKFdbc9pKVePnux1cb6sqfXjg5Dd1IGTKwDRyTceniy6q','',NULL,'user','active',0,NULL),(6,'ADMIN','admin01@gmail.com','$2b$10$/X.brHJB4JCTXBVYiqCWa.qTQ6nPdsLnjfAMCXidknRh0.DumaYve',NULL,NULL,'admin','active',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'petshop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-12 13:57:32
