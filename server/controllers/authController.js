const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

const offlineFamily = [{
  name: 'Offline Family',
  email: 'offline@email.com',
  id: 12,
  users: [
    { name: 'dad', id: 0, tasks: [], admin: true, manager: true },
    { name: 'mom', id: 1, tasks: [], admin: false, manager: true },
    { name: 'son', id: 2, tasks: [], admin: false, manager: false },
  ],
}];

module.exports = {

  createFamily: async ( req, res ) => {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash( password, saltRounds );
    const [response] = await req.app.get('db').auth.createFamily({ name, email, password: hash });

    res.status(200).send(response);
  },

  loginFamily: async ( req, res ) => {
    const { email, password } = req.body;

    const [family] = await req.app.get('db').auth.loginFamily({ email });
    console.log(family);

    if( family ) {
      // const match = password === family.password;
      const match = await bcrypt.compare( password, family.password );
      if( match ) {
        res.status(200).send(family);
      } else {
        res.status(401).send({ message: 'Email or password is incorrect' });
      }
    } else {
      res.status(404).send({ message: `No users with the email, "${email}", were found` });
    }
  },

};
