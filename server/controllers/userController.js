const camelCaseKeys = require('../helpers/camelCaseKeys');

module.exports = {
  createUser: async ( req, res ) => {
    const { session: { familyId }, body } = req;
    const {
      user: {
        name, password, points, admin, manager,
        permissions: {
          ownName, ownPassword, ownImage, ownSettings,
          otherName, otherPassword, otherPoints, assignTask, assignEvent,
          createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
        },
      },
    } = body;

    try {
      const _response = await req.app.get('db').users.createUser({
        name, password, points, admin, manager, familyId,
        ownName, ownPassword, ownImage, ownSettings,
        otherName, otherPassword, otherPoints, assignTask, assignEvent,
        createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
      });

      const users = await getAllUsers( req, familyId );

      res.status( 200 ).send( users );
    } catch (error) {
      console.log(error);
      res.status( 500 ).send( 'Your request could not be completed at this time. Please try again.' );
    }
  },

  updateUser: async ( req, res ) => {
    const { body, session: { familyId } } = req;
    const {
      user: {
        id, name, password, points, admin, manager,
        permissions: {
          ownName, ownPassword, ownImage, ownSettings,
          otherName, otherPassword, otherPoints, assignTask, assignEvent,
          createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
        },
      },
    } = body;

    try {
      const _response = await req.app.get('db').users.updateUser({
        id, name, password, points, admin, manager, familyId,
        ownName, ownPassword, ownImage, ownSettings,
        otherName, otherPassword, otherPoints, assignTask, assignEvent,
        createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
      });

      const users = await getAllUsers( req, familyId );

      res.status( 200 ).send( users );
    } catch (error) {
      console.log(error);
      res.status( 500 ).send( 'Your request could not be completed at this time. Please try again.' );
    }
  },

  deleteUser: async ( req, res ) => {
    const { params: { id }, session: { familyId } } = req;

    try {
      const _response = await req.app.get('db').users.deleteUser({ id });
      const users = await getAllUsers( req, familyId );
      res.status( 200 ).send( users );
    } catch (error) {
      console.log(error);
      res.status( 500 ).send( 'Your request could not be completed at this time. Please try again' );
    }
  },
};

async function getAllUsers( req, familyId ) {
  const users = await req.app.get('db').users.getUsersByFamily({ familyId });

  await Promise.all(
    users.map(async user => {
      const [perms] = await req.app.get('db').users.getUserPermissions({ userId: user.id });
      const { id, user_id, ...permissions } = perms;
      user.permissions = camelCaseKeys( permissions );
      return user;
    }),
  );

  return users;
}
