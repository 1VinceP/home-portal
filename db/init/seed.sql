DROP TABLE IF EXISTS Families;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Rewards;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Family_tasks;
DROP TABLE IF EXISTS Family_rewards;
DROP TABLE IF EXISTS "Permissions";
DROP TABLE IF EXISTS Settings;
DROP TABLE IF EXISTS User_connections;
DROP TABLE IF EXISTS User_permissions;
DROP TABLE IF EXISTS User_settings;

CREATE TABLE Families (
    id SERIAL  PRIMARY KEY
  , "name"     TEXT
  , email      TEXT
  , "password" TEXT
);
INSERT INTO Families ( "name", email, "password" ) VALUES ( 'a', 'a', 'a' );

CREATE TABLE Users (
    id SERIAL  PRIMARY KEY
  , username   TEXT
  , "password" TEXT
  , "admin"    BOOLEAN
  , manager    BOOLEAN
  , family_id  INT -- FOREIGN KEY to Family
);
INSERT INTO Users ( username, "admin", manager ) VALUES ( 'Demo Admin', true, true );
INSERT INTO Users ( username, "admin", manager ) VALUES ( 'Demo Manager', false, true );
INSERT INTO Users ( username, "admin", manager ) VALUES ( 'Demo User', false, false );

CREATE TABLE Rewards (
    id SERIAL     PRIMARY KEY
  , "name"        TEXT
  , "image"       TEXT
  , "description" TEXT
  , cost          SMALLINT
);
INSERT INTO Rewards ( "name", "image", "description", cost ) VALUES ( 'Dont cook dinner', null, 'You dont have to cook dinner today', 1000 );
INSERT INTO Rewards ( "name", "image", "description", cost ) VALUES ( 'Candy Bar', null, 'A king size candy bar of your choice', 300 );

CREATE TABLE Tasks (
    id SERIAL     PRIMARY KEY
  , "name"        TEXT
  , "image"       TEXT
  , "description" TEXT
  , reward        SMALLINT
);

CREATE TABLE Family_tasks (
    id SERIAL  PRIMARY KEY
  , family_id  INT
  , task_id    INT
  , start_time TIMESTAMP
  , end_time   TIMESTAMP
  , duration   TIME
  , reward     SMALLINT
);

CREATE TABLE Family_rewards (
    id SERIAL PRIMARY KEY
  , family_id INT
  , reward_id INT
  , cost      SMALLINT
);

CREATE TABLE "Permissions" (
    id SERIAL PRIMARY KEY
  , "name"    TEXT
);

CREATE TABLE Settings (
    id SERIAL PRIMARY KEY
  , "name"    TEXT
);

CREATE TABLE User_connections (
    id SERIAL PRIMARY KEY
  , "user_id" INT -- FOREIGN KEY to Users
  , reward_id INT -- FOREIGN KEY to Rewards
  , task_id   INT -- FOREIGN KEY to Tasks
);

CREATE TABLE User_permissions (
    id SERIAL     PRIMARY KEY
  , "user_id"     INT
  , permission_id INT
  , "value"       BOOLEAN
);

CREATE TABLE User_settings (
    id SERIAL  PRIMARY KEY
  , "user_id"  INT
  , setting_id INT
  , "value"    BOOLEAN
);
