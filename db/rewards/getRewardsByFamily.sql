SELECT r.*, fr.cost
  FROM Family f
  JOIN Family_rewards fr ON f.id = fr.family_id
  JOIN Rewards r ON r.id = fr.reward_id
    WHERE f.id = ${familyId}
    ORDER BY r.id;
