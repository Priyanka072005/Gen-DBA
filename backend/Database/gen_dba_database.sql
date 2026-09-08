-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: gen_dba_database
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `query_id` int DEFAULT NULL,
  `action_type` enum('APPROVE','REJECT','EXECUTE') DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `query_id` (`query_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_2` FOREIGN KEY (`query_id`) REFERENCES `query_logs` (`query_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `execution_plans`
--

DROP TABLE IF EXISTS `execution_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_plans` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `query_id` int DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `rows_processed` int DEFAULT NULL,
  `scan_type` varchar(50) DEFAULT NULL,
  `join_type` varchar(50) DEFAULT NULL,
  `execution_details` text,
  PRIMARY KEY (`plan_id`),
  KEY `query_id` (`query_id`),
  CONSTRAINT `execution_plans_ibfk_1` FOREIGN KEY (`query_id`) REFERENCES `query_logs` (`query_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `execution_plans`
--

LOCK TABLES `execution_plans` WRITE;
/*!40000 ALTER TABLE `execution_plans` DISABLE KEYS */;
INSERT INTO `execution_plans` VALUES (1,2,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(2,1,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(3,2,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(4,2,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(5,3,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(6,4,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(7,5,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(8,17,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': None}'),(9,18,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(10,19,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(11,21,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(12,25,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(13,23,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(14,23,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}'),(15,22,1,1,'ALL',NULL,'{\'id\': 1, \'select_type\': \'SIMPLE\', \'table\': \'users\', \'partitions\': None, \'type\': \'ALL\', \'possible_keys\': None, \'key\': None, \'key_len\': None, \'ref\': None, \'rows\': 1, \'filtered\': 100.0, \'Extra\': \'Using where\'}');
/*!40000 ALTER TABLE `execution_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `optimizations`
--

DROP TABLE IF EXISTS `optimizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `optimizations` (
  `optimization_id` int NOT NULL AUTO_INCREMENT,
  `query_id` int DEFAULT NULL,
  `optimized_query` text,
  `suggested_index` text,
  `optimization_type` varchar(100) DEFAULT NULL,
  `improvement_percentage` float DEFAULT NULL,
  PRIMARY KEY (`optimization_id`),
  KEY `query_id` (`query_id`),
  CONSTRAINT `optimizations_ibfk_1` FOREIGN KEY (`query_id`) REFERENCES `query_logs` (`query_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `optimizations`
--

LOCK TABLES `optimizations` WRITE;
/*!40000 ALTER TABLE `optimizations` DISABLE KEYS */;
/*!40000 ALTER TABLE `optimizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance_metrics`
--

DROP TABLE IF EXISTS `performance_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance_metrics` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `query_id` int DEFAULT NULL,
  `original_cost` float DEFAULT NULL,
  `optimized_cost` float DEFAULT NULL,
  `original_execution_time` float DEFAULT NULL,
  `optimized_execution_time` float DEFAULT NULL,
  `cpu_usage` float DEFAULT NULL,
  `memory_usage` float DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `query_id` (`query_id`),
  CONSTRAINT `performance_metrics_ibfk_1` FOREIGN KEY (`query_id`) REFERENCES `query_logs` (`query_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_metrics`
--

LOCK TABLES `performance_metrics` WRITE;
/*!40000 ALTER TABLE `performance_metrics` DISABLE KEYS */;
/*!40000 ALTER TABLE `performance_metrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query_logs`
--

DROP TABLE IF EXISTS `query_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query_logs` (
  `query_id` int NOT NULL AUTO_INCREMENT,
  `query_text` text NOT NULL,
  `execution_time` float DEFAULT NULL,
  `frequency` int DEFAULT '1',
  `database_name` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`query_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query_logs`
--

LOCK TABLES `query_logs` WRITE;
/*!40000 ALTER TABLE `query_logs` DISABLE KEYS */;
INSERT INTO `query_logs` VALUES (1,'SELECT * FROM users',0.0026412,1,'gen_dba','tejshree','2026-05-03 11:46:49'),(2,'SELECT * FROM users',0,1,'gen_dba','tejshree','2026-05-03 11:46:51'),(3,'SELECT * FROM users',0.00405645,1,'gen_dba_database','','2026-05-03 11:50:55'),(4,'SELECT * FROM users',0.00419927,1,'gen_dba_database','priyanka','2026-05-03 11:56:22'),(5,'SELECT * FROM users',0,1,'gen_dba_database','priyanka','2026-05-03 11:56:24'),(6,'SELECT * FROM users u JOIN users u2 ON u.id = u2.id',NULL,1,'gen_dba_database','test','2026-05-03 11:57:58'),(7,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','test','2026-05-03 12:01:53'),(8,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','test','2026-05-03 12:01:54'),(9,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','test','2026-05-03 12:04:09'),(10,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','test','2026-05-03 12:04:11'),(11,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','Atharv','2026-05-03 12:04:53'),(12,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','Harshvardhan','2026-05-03 12:05:02'),(13,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','Harsh','2026-05-03 12:05:08'),(14,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','Ram','2026-05-03 12:05:31'),(15,'SELECT * FROM users WHERE name LIKE \'%a%\'',NULL,1,'gen_dba_database','Tej','2026-05-03 12:05:41'),(16,'SELECT * FROM users WHERE username LIKE \'%a%\'\'',NULL,1,'gen_dba_database','Tej','2026-05-03 12:09:10'),(17,'SELECT * FROM users LIMIT 5',0.00402594,1,'gen_dba_database','Tej','2026-05-03 12:09:39'),(18,'SELECT * FROM users WHERE username LIKE \'%a%\'',0.00200796,1,'gen_dba_database','Tej','2026-05-03 12:09:54'),(19,'SELECT * FROM users WHERE username LIKE \'%a%\'',0.00432348,1,'gen_dba_database','Tej','2026-05-03 12:11:04'),(20,'SELECT * FROM users WHERE username LIKE \'%a%\'',NULL,1,'gen_dba_database','Tej','2026-05-03 12:11:05'),(21,'SELECT * FROM users WHERE username LIKE \'%a%\'',0.00412464,1,'gen_dba_database','Tej','2026-05-03 12:11:06'),(22,'SELECT * FROM users WHERE username LIKE \'%a%\'',0,1,'gen_dba_database','Tej','2026-05-03 12:11:07'),(23,'SELECT * FROM users WHERE username LIKE \'%a%\'',0.00200868,1,'gen_dba_database','Tej','2026-05-03 12:11:07'),(24,'SELECT * FROM users WHERE username LIKE \'%a%\'',NULL,1,'gen_dba_database','Tej','2026-05-03 12:11:08'),(25,'SELECT * FROM users WHERE username LIKE \'%a%\'',0,1,'gen_dba_database','Tej','2026-05-03 12:11:09'),(26,'SELECT c.customer_city, o.order_status FROM customers c JOIN orders o ON c.customer_id = o.customer_id',NULL,1,'target_db','tejshree','2026-05-03 15:48:48'),(27,'SELECT c.customer_city, o.order_status FROM customers c JOIN orders o ON c.customer_id = o.customer_id',NULL,1,'target_db','tejshree','2026-05-03 15:48:50'),(28,'SELECT c.customer_city, o.order_status FROM customers c JOIN orders o ON c.customer_id = o.customer_id',NULL,1,'target_db','tejshree','2026-05-03 15:51:23'),(29,'SELECT * FROM users',NULL,1,'target_db','tejshree','2026-05-03 15:58:08'),(30,'SELECT * FROM users',NULL,1,'target_db','tejshree','2026-05-03 15:58:09');
/*!40000 ALTER TABLE `query_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risk_impact`
--

DROP TABLE IF EXISTS `risk_impact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `risk_impact` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `query_id` int DEFAULT NULL,
  `impact_score` float DEFAULT NULL,
  `risk_score` float DEFAULT NULL,
  `priority_level` enum('HIGH','MEDIUM','LOW') DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `query_id` (`query_id`),
  CONSTRAINT `risk_impact_ibfk_1` FOREIGN KEY (`query_id`) REFERENCES `query_logs` (`query_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risk_impact`
--

LOCK TABLES `risk_impact` WRITE;
/*!40000 ALTER TABLE `risk_impact` DISABLE KEYS */;
/*!40000 ALTER TABLE `risk_impact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Developer','Viewer') DEFAULT 'Viewer',
  `email` varchar(150) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-01 22:27:33
