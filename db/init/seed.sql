DROP TABLE IF EXISTS Families;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Rewards;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Family_tasks;
DROP TABLE IF EXISTS Family_rewards;
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
  , "name"     TEXT
  , "password" TEXT
  , "admin"    BOOLEAN
  , manager    BOOLEAN
  , points     INT
  , family_id  INT -- FOREIGN KEY to Family
);
INSERT INTO Users ( "name", "admin", manager ) VALUES ( 'Demo Admin', true, true );
INSERT INTO Users ( "name", "admin", manager ) VALUES ( 'Demo Manager', false, true );
INSERT INTO Users ( "name", "admin", manager ) VALUES ( 'Demo User', false, false );

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
);
INSERT INTO Tasks ( "name", "description" ) VALUES ( 'Dishes', '' );
INSERT INTO Tasks ( "name", "description" ) VALUES ( 'Feed animals', '' );
INSERT INTO Tasks ( "name", "description" ) VALUES ( 'Clear table', '' );
INSERT INTO Tasks ( "name", "description" ) VALUES ( 'Clean toilet', '' );
INSERT INTO Tasks ( "name", "description" ) VALUES ( 'Mow lawn', '' );

CREATE TABLE Family_tasks (
    id SERIAL  PRIMARY KEY
  , family_id  INT
  , task_id    INT
  , start_time TIMESTAMP
  , end_time   TIMESTAMP
  , duration   TIME
  , reward     SMALLINT
);
INSERT INTO Family_tasks ( family_id, task_id, reward ) VALUES ( 1, 1, 200 );
INSERT INTO Family_tasks ( family_id, task_id, reward ) VALUES ( 1, 2, 100 );
INSERT INTO Family_tasks ( family_id, task_id, reward ) VALUES ( 1, 3, 150 );
INSERT INTO Family_tasks ( family_id, task_id, reward ) VALUES ( 1, 4, 200 );
INSERT INTO Family_tasks ( family_id, task_id, reward ) VALUES ( 1, 5, 300 );

CREATE TABLE Family_rewards (
    id SERIAL PRIMARY KEY
  , family_id INT
  , reward_id INT
  , cost      SMALLINT
);

CREATE TABLE User_connections (
    id SERIAL PRIMARY KEY
  , "user_id" INT -- FOREIGN KEY to Users
  , reward_id INT -- FOREIGN KEY to Rewards
  , task_id   INT -- FOREIGN KEY to Tasks
);

CREATE TABLE User_permissions (
    id SERIAL      PRIMARY KEY
  , "user_id"      INT
  , own_name       BOOLEAN
  , own_password   BOOLEAN
  , own_image      BOOLEAN
  , own_settings   BOOLEAN
  , other_name     BOOLEAN
  , other_password BOOLEAN
  , other_points   BOOLEAN
  , assign_task    BOOLEAN
  , assign_event   BOOLEAN
  , create_task    BOOLEAN
  , edit_task      BOOLEAN
  , edit_event     BOOLEAN
  , edit_reward    BOOLEAN
  , create_recipe  BOOLEAN
  , edit_recipe    BOOLEAN
);

CREATE TABLE User_settings (
    id SERIAL  PRIMARY KEY
  , "user_id"  INT
  , setting_id INT
  , "value"    BOOLEAN
);
