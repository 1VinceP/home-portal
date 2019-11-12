-- This inserts the user into the Users table and returns the id
WITH rows as (
  INSERT INTO Users (
    "name", "password", "admin", manager, points, family_id
  ) VALUES (
    ${name}, ${password}, ${admin}, ${manager}, ${points}, ${familyId}
  ) RETURNING id
)

INSERT INTO User_permissions (
  "user_id",
  own_name, own_password, own_image, own_settings,
  other_name, other_password, other_points, assign_task, assign_event,
  create_task, edit_task, edit_event, edit_reward, create_recipe, edit_recipe
)
  SELECT id, -- here we are using the returned id from above
  ${ownName}, ${ownPassword}, ${ownImage}, ${ownSettings},
  ${otherName}, ${otherPassword}, ${otherPoints}, ${assignTask}, ${assignEvent},
  ${createTask}, ${editTask}, ${editEvent}, ${editReward}, ${createRecipe}, ${editRecipe}
    FROM rows;
