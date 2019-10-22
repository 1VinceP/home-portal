require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , chalk = require('chalk');

let app = express();
app.use( bodyParser.json() );

// database connection
massive( process.env.DATABASE_URI ).then(db => {
  console.log( chalk.magenta( 'Connected to Database' ) );
  app.set( 'db', db );
  app.get( 'db' ).init.seed()
    .then( res => console.log( res ) )
    .catch( res => console.log( res ) );
  listen();
});








function listen() {
  let port = process.env.NODE_PORT || 8081;
  const portChalk = chalk.cyan.underline;
  app.listen(port, () => {
    console.log( portChalk( `eavesdropping_on_port_${port}` ) );
  });
}
