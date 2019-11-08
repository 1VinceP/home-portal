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

    req.session.familyId = response.id;

    const family = {
      ...response,
      calendar: [],
      tasks: [],
      rewards: [],
      users: [],
    };

    res.status(200).send(family);
  },

  loginFamily: async ( req, res ) => {
    const { email, password } = req.body;

    const [response] = await req.app.get('db').auth.loginFamily({ email });

    if( response ) {
      const match = password === response.password;
      // const match = await bcrypt.compare( password, response.password );
      if( match ) {
        req.session.familyId = response.id;

        // const calendar = await req.app.get('db').calendar.getCalendarByFamily({ familyId: family.id });
        const rewards = await req.app.get('db').rewards.getRewardsByFamily({ familyId: response.id });
        const tasks = await req.app.get('db').tasks.getTasksByFamily({ familyId: response.id });
        const users = await req.app.get('db').users.getUsersByFamily({ familyId: response.id });

        const family = {
          ...response,
          // calendar,
          rewards,
          tasks,
          users,
        };

        res.status(200).send(family);
      } else {
        res.status(401).send({ message: 'Email or password is incorrect' });
      }
    } else {
      res.status(404).send({ message: `No users with the email, "${email}", were found` });
    }
  },

};
