module.exports = ( req, res, next ) => {
  const { session, params } = req;
  if (session.familyId) {
    next();
  } else {
    res.status( 401 ).send( 'You are not authorized to access this endpoint' );
  }
};
