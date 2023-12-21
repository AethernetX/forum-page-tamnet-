-- -----------------------------------------------------
-- Make database tamnet
-- -----------------------------------------------------
CREATE DATABASE tamnet;
USE tamnet ;

-- -----------------------------------------------------
-- Table `tamnet`.`posts`
-- -----------------------------------------------------
CREATE TABLE posts (
  post_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(15),
  description VARCHAR(400),
  user_id INT,
  topic_id INT,
  post_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id));


-- -----------------------------------------------------
-- Table `tamnet`.`topic_user`
-- -----------------------------------------------------
CREATE TABLE topic_user (
  user_id INT NOT NULL,
  topic_id INT NULL);


-- -----------------------------------------------------
-- Table `tamnet`.`topics`
-- -----------------------------------------------------
CREATE TABLE topics (
  topic_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(21),
  description VARCHAR(200),
  PRIMARY KEY (topic_id));


-- -----------------------------------------------------
-- Table `tamnet`.`users`
-- -----------------------------------------------------
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15),
  password VARCHAR(20),
  PRIMARY KEY (user_id));

CREATE USER 'tamAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tam2424';
GRANT ALL PRIVILEGES ON tamnet.* TO 'tamAdmin'@'localhost';