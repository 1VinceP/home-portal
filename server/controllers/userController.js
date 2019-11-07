module.exports = {

  createUser: async ( req, res ) => {
    const {
      session: { familyId },
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
    } = req.body;

    try {
      const response = await req.app.get('db').users.createUser({
        name, password, points, admin, manager,
        ownName, ownPassword, ownImage, ownSettings,
        otherName, otherPassword, otherPoints, assignTasks, assignEvents,
        createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
      });
      const users = await req.app.get('db').users.getUsersByFamily({ familyId });
      res.status( 200 ).send( users );
    } catch (error) {
      res.status( 501 ).send( 'Your request could not be completed at this time. Please try again.' );
    }
  },

};
