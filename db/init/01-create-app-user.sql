-- Crear usuari de l'aplicació amb permisos limitats
CREATE USER IF NOT EXISTS 'padel_user'@'%' IDENTIFIED BY 'padel_pass';
GRANT SELECT, INSERT, UPDATE, DELETE ON padel.* TO 'padel_user'@'%';
FLUSH PRIVILEGES;
