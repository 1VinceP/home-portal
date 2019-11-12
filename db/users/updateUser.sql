UPDATE Users
  SET "name" = ${name}
  , "password" = ${password}
  , "admin" = ${admin}
  , manager = ${manager}
  , points = ${points}
    WHERE id = ${id};

UPDATE User_permissions
  SET own_name = ${ownName}
  , own_password = ${ownPassword}
  , own_image = ${ownImage}
  , own_settings = ${ownSettings}
  , other_name = ${otherName}
  , other_password = ${otherPassword}
  , other_points = ${otherPoints}
  , assign_task = ${assignTask}
  , assign_event = ${assignEvent}
  , create_task = ${createTask}
  , edit_task = ${editTask}
  , edit_event = ${editEvent}
  , edit_reward = ${editReward}
  , create_recipe = ${createRecipe}
  , edit_recipe = ${editRecipe}
    WHERE "user_id" = ${id};