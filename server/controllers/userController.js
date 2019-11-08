import map from 'lodash/map';
import camelCase from 'lodash/camelCase';

module.exports = {

  createUser: async ( req, res ) => {
    const { session: { familyId }, body } = req;
    const {
      user: {
        name, password, points, admin, manager,
        settings: {
          permissions: {
            ownName, ownPassword, ownImage, ownSettings,
            otherName, otherPassword, otherPoints, assignTasks, assignEvents,
            createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
          },
        },
      },
    } = body;

    try {
      const response = await req.app.get('db').users.createUser({
        name, password, points, admin, manager, familyId,
        ownName, ownPassword, ownImage, ownSettings,
        otherName, otherPassword, otherPoints, assignTasks, assignEvents,
        createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
      });
      const users = await req.app.get('db').users.getUsersByFamily({ familyId });

      await Promise.all(
        users.map(async user => {
          const [perms] = await req.app.get('db').users.getUserPermissions({ userId: user.id });
          const { id, user_id, ...permissions } = perms;
          user.settings = { permissions };
          map(user.settings.permissions, perm => { return camelCase(perm) });
          return user;
        }),
      );

      res.status( 200 ).send( users );
    } catch (error) {
      console.log(error);
      res.status( 501 ).send( 'Your request could not be completed at this time. Please try again.' );
    }
  },

};
