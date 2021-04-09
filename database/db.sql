SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nodejs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nodejs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nodejs` DEFAULT CHARACTER SET utf8;
USE `nodejs`;

-- -----------------------------------------------------
-- Table `nodejs`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nodejs`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nodejs`.`links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nodejs`.`links` (
  `id_link` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_link`),
  UNIQUE INDEX `id_link_UNIQUE` (`id_link` ASC),
  INDEX `fk_links_users_idx` (`id_user` ASC),
  CONSTRAINT `fk_links_users`
    FOREIGN KEY (`id_user`)
    REFERENCES `nodejs`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;