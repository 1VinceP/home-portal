DROP TABLE IF EXISTS Rewards;

CREATE TABLE Rewards (
    id SERIAL PRIMARY KEY
  , "name" TEXT
  , "image" TEXT
  , "description" TEXT
  , cost SMALLINT
);
INSERT INTO Rewards ( "name", "image", "description", cost ) VALUES ( 'Dont cook dinner', null, 'You dont have to cook dinner today', 1000 );
INSERT INTO Rewards ( "name", "image", "description", cost ) VALUES ( 'Candy Bar', null, 'A king size candy bar of your choice', 300 );
