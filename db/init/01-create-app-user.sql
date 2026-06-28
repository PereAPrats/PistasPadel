-- Crear usuari de l'aplicació amb permisos per a migracions i operacions CRUD
CREATE USER IF NOT EXISTS 'padel_user'@'%' IDENTIFIED BY 'padel_pass';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX ON padel.* TO 'padel_user'@'%';
FLUSH PRIVILEGES;
