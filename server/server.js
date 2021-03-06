require('dotenv').config();

const express = require( 'express' )
    , bodyParser = require( 'body-parser' )
    , session = require( 'cookie-session' )
    , massive = require( 'massive' )
    , helmet = require( 'helmet' )
    , chalk = require( 'chalk' );

const authValidation = require( './middleware/authValidation' );

const authController = require( './controllers/authController' );
const userController = require( './controllers/userController' );
const taskController = require( './controllers/taskController' );

let app = express();

/* middleware */
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY_1, process.env.SESSION_KEY_2],
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true,
    httpOnly: true,
    expires: new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour
  },
}));
app.use( bodyParser.json() );
app.use( helmet() );

/* database connection */
massive( process.env.DATABASE_URI ).then(db => {
  console.log( chalk.magenta( 'Connected to Database' ) );
  app.set( 'db', db );
  app.get( 'db' ).init.seed()
    .catch( res => console.log( res ) );
  listen();
}).catch(() => {
  console.log( chalk.red( 'Could not connect to Database' ) );
  listen();
});

/* REST routes */
// Authentication
app.post( '/auth/family/create', authController.createFamily );
app.post( '/auth/family/login', authController.loginFamily );

// Users
app.post( '/family/users', authValidation, userController.createUser );
app.put( '/family/users', authValidation, userController.updateUser );
app.delete( '/family/users/:id', authValidation, userController.deleteUser );

// Tasks
app.get( '/family/tasks', authValidation, taskController.getTasks );
app.put( '/family/tasks', authValidation, taskController.updateTask );



function listen() {
  let port = process.env.NODE_PORT || 8081;
  const portChalk = chalk.cyan.underline;
  app.listen(port, () => {
    console.log( portChalk( `eavesdropping_on_port_${port}` ) );
  });
}
