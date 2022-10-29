CREATE DATABASE todolist;
USE todolist;

CREATE TABLE IF NOT EXISTS `taches_status` (
    `idstatus` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `status` TINYINT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS `taches_nom` (
    `idtaches` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom` VARCHAR(255) NOT NULL,
    `status` INT NOT NULL,
    CONSTRAINT `fk_nom_status`
        FOREIGN KEY (`status`)
        REFERENCES `taches_status` (`idstatus`)
);

-- Tâches en cours (id 1)
INSERT INTO `taches_status` (`status`) VALUES (0);
-- Tâches terminées (id 2)
INSERT INTO `taches_status` (`status`) VALUES (1);