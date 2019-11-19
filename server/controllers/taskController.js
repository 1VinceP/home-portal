module.exports = {
  getTasks: async ( req, res ) => {
    const { session: { familyId } } = req;

    const tasks = await req.app.get('db').tasks.getTasksByFamily({ familyId });
    res.status( 200 ).send( tasks );
  },

  updateTask: async ( req, res ) => {
    const { session: { familyId }, body } = req;
    const {
      task: {
        id, name, description, reward,
      },
    } = body;

    try {
      const response = await req.app.get('db').tasks.updateTask({
        taskId: id, familyId, name, description, reward,
      });
      const tasks = await req.app.get('db').tasks.getTasksByFamily({ familyId });
      res.status( 200 ).send( tasks );
    } catch (error) {
      console.log(error);
    }
  },
};
