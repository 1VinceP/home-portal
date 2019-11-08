WITH rows as (
  INSERT INTO Users (
    "name", "password", points, "admin", manager, family_id
  ) VALUES (
    ${name}, ${password}, ${points}, ${admin}, ${manager}, ${familyId}
  ) RETURNING id
)

-- INSERT INTO User_permissions (
  -- "user_id",
  -- ownName, ownPassword, ownImage, ownSettings,
  -- otherName, otherPassword, otherPoints, assignTasks, assignEvents,
  -- createTask, editTask, editEvent, editReward, createRecipe, editRecipe,
-- ) VALUES (
--   last_id
  -- ${ownName}, ${ownPassword}, ${ownImage}, ${ownSettings},
  -- ${otherName}, ${otherPassword}, ${otherPoints}, ${assignTasks}, ${assignEvents},
  -- ${createTask}, ${editTask}, ${editEvent}, ${editReward}, ${createRecipe}, ${editRecipe}
-- );

INSERT INTO User_permissions (
  "user_id",
  own_name, own_password, own_image, own_settings,
  other_name, other_password, other_points, assign_tasks, assign_events,
  create_task, edit_task, edit_event, edit_reward, create_recipe, edit_recipe
)
  SELECT id,
  ${ownName}, ${ownPassword}, ${ownImage}, ${ownSettings},
  ${otherName}, ${otherPassword}, ${otherPoints}, ${assignTasks}, ${assignEvents},
  ${createTask}, ${editTask}, ${editEvent}, ${editReward}, ${createRecipe}, ${editRecipe}
    FROM rows;
