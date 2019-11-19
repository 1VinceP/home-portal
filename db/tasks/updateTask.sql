UPDATE Tasks
  SET "name" = ${name}
  , "description" = ${description}
    WHERE id = ${taskId};

UPDATE Family_tasks
  SET reward = ${reward}
    WHERE task_id = ${taskId} AND family_id = ${familyId};
