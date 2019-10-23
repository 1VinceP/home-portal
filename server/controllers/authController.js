const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

module.exports = {

  createFamily: async ( req, res ) => {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash( password, saltRounds );
    const response = await req.app.get('db').auth.createFamily({ name, email, password: hash });

    res.status(200).send(response);
  },

  loginFamily: async ( req, res ) => {
    const { email, password } = req.body;

    const family = await req.app.get('db').auth.loginFamily({ email });

    if( family ) {
      const match = await bcrypt.compare( password, family.password );
      if( match ) {
        res.status(200).send(family);
      } else {
        res.status(401).send({ message: 'Email or password is incorrect' });
      }
    } else {
      res.status(404).send({ message: `No users with the email, ${email}, were found` });
    }
  },

};
