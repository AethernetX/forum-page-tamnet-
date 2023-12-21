-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema tamnet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tamnet` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tamnet` ;

-- -----------------------------------------------------
-- Table `tamnet`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tamnet`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(15) NULL DEFAULT NULL,
  `description` VARCHAR(400) NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `topic_id` INT NULL DEFAULT NULL,
  `post_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tamnet`.`topic_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tamnet`.`topic_user` (
  `user_id` INT NOT NULL,
  `topic_id` INT NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tamnet`.`topics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tamnet`.`topics` (
  `topic_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(21) NULL DEFAULT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`topic_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tamnet`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tamnet`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15) NULL DEFAULT NULL,
  `password` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE USER 'tamAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tam2424';
GRANT ALL PRIVILEGES ON tamnet.* TO 'tamAdmin'@'localhost';