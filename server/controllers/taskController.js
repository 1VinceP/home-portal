module.exports = {
  getTasks: async ( req, res ) => {
    const { session: { familyId } } = req;

    const tasks = await req.app.get('db').tasks.getTasks({ familyId });
    res.status( 200 ).send( tasks );
  },
};
