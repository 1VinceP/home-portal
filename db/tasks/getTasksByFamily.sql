SELECT t.*, ft.start_time, ft.end_time, ft.duration, ft.reward
  FROM Families f
  JOIN Family_tasks ft ON f.id = ft.family_id
  JOIN Tasks t ON t.id = ft.task_id
    WHERE f.id = ${familyId}
    ORDER BY t.name;
