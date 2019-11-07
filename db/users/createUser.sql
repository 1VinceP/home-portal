WITH rows as (
  INSERT INTO Users (
    "name", "password", points, "admin", manager
  ) VALUES (
    ${name}, ${password}, ${points}, ${admin}, ${manager}
  ) RETURNING "user_id";
);

INSERT INTO User_permissions (
  "user_id",
  ownName, ownPassword, ownImage, ownSettings,
  otherName, otherPassword, otherPoints, assignTasks, assignEvents,
  createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
) VALUES (
  SELECT "user_id" FROM rows,
  ${ownName}, ${ownPassword}, ${ownImage}, ${ownSettings},
  ${otherName}, ${otherPassword}, ${otherPoints}, ${assignTasks}, ${assignEvents},
  ${createTask}, ${editTask}, ${editEvent}, ${editReward}, ${createRecipe}, ${editRecipe}
);
