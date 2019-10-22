DROP TABLE IF EXISTS Family;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Rewards;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS User_connections;
DROP TABLE IF EXISTS Family_tasks;
DROP TABLE IF EXISTS Family_rewards;

CREATE TABLE Family (
    id SERIAL PRIMARY KEY
  , "name" TEXT
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY
  , username  TEXT
  , "admin"   BOOLEAN
  , manager   BOOLEAN,
  , family_id INT -- FOREIGN KEY to Family
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
)

CREATE TABLE User_connections (
    id SERIAL PRIMARY KEY
  , "user_id" INT -- FOREIGN KEY to Users
  , reward_id INT -- FOREIGN KEY to Rewards
  , task_id   INT -- FOREIGN KEY to Tasks
);

CREATE TABLE Family_tasks (
    id SERIAL PRIMARY KEY
  , family_id INT
  , task_id INT
  , start_time DATETIME
  , end_time DATETIME
  , duration TIME
  , reward SMALLINT
);

CREATE TABLE Family_rewards (
    id SERIAL PRIMARY KEY
  , family_id INT
  , reward_id INT
  , cost SMALLINT
);
