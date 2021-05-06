/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3300
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : localhost:3300
 Source Schema         : cda

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 06/05/2021 14:58:30
*/

CREATE DATABASE IF NOT EXISTS `cda` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `cda`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for criminal_code
-- ----------------------------
DROP TABLE IF EXISTS `criminal_code`;
CREATE TABLE `criminal_code`  (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Penality` decimal(10, 2) NOT NULL,
  `PrisonTime` int NOT NULL,
  `StatusId` int NOT NULL,
  `CreateDate` datetime(0) NOT NULL,
  `UpdateDate` datetime(0) NULL DEFAULT NULL,
  `CreateUserId` int NOT NULL,
  `UpdateUserId` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `CreateUserId`(`CreateUserId`) USING BTREE,
  INDEX `UpdateUserId`(`UpdateUserId`) USING BTREE,
  INDEX `StatusId`(`StatusId`) USING BTREE,
  CONSTRAINT `criminal_code_ibfk_1` FOREIGN KEY (`CreateUserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `criminal_code_ibfk_2` FOREIGN KEY (`UpdateUserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `criminal_code_ibfk_3` FOREIGN KEY (`StatusId`) REFERENCES `status` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of criminal_code
-- ----------------------------
INSERT INTO `criminal_code` VALUES (1, 'Roubo', 'Subtrair coisa móvel alheia, para si ou para outrem, mediante grave ameaça ou violência a pessoa, ou depois de havê-la, por qualquer meio, reduzido à impossibilidade de resistência', 5350.25, 8, 1, '2021-05-05 15:32:12', '2021-05-05 15:32:57', 1, 1);
INSERT INTO `criminal_code` VALUES (2, 'Extorsão', 'Constranger alguém, mediante violência ou grave ameaça, e com\no intuito de obter para si ou para outrem indevida vantagem econômica,\na fazer, tolerar que se faça ou deixar fazer alguma coisa', 3500.00, 0, 1, '2021-05-05 15:38:19', NULL, 1, NULL);
INSERT INTO `criminal_code` VALUES (3, 'Estelionato', 'Obter, para si ou para outrem, vantagem ilícita, em prejuízo\nalheio, induzindo ou mantendo alguém em erro, mediante artifício, ardil,\nou qualquer outro meio fraudulento', 500.00, 5, 1, '2021-05-05 15:42:29', '2021-05-05 15:55:52', 1, 1);
INSERT INTO `criminal_code` VALUES (4, 'Receptação', 'Adquirir, receber, transportar, conduzir ou ocultar, em proveito próprio ou alheio, coisa que sabe ser produto de crime, ou influir para que terceiro, de boa-fé, a adquira, receba ou oculte.', 3500.25, 8, 1, '2021-05-05 15:51:56', '2021-05-05 15:52:11', 1, 1);
INSERT INTO `criminal_code` VALUES (5, 'Homicídio Simples', 'Matar alguém', 10000.50, 25, 1, '2021-05-05 15:56:48', NULL, 1, NULL);
INSERT INTO `criminal_code` VALUES (6, 'Abandono de Incapaz', 'Abandonar pessoa que está sob seu cuidado, guarda, vigilância ou autoridade, e, por qualquer motivo, incapaz de defender-se dos riscos resultantes do abandono.', 5000.50, 3, 1, '2021-05-05 16:00:20', '2021-05-05 16:00:38', 1, 1);
INSERT INTO `criminal_code` VALUES (7, 'Rixa', 'Participar de rixa, salvo para separar os contendores.', 1250.29, 1, 1, '2021-05-05 16:01:56', NULL, 1, NULL);

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES (1, 'Ativo');
INSERT INTO `status` VALUES (2, 'Inativo');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '$2a$11$DL3yKnYH6DJAYNzCwPhfDuhyMbEY2v6q6LwOhpdbIE7HrHjPFg4.G');

SET FOREIGN_KEY_CHECKS = 1;
