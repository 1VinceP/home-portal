INSERT INTO Families ( "name", email, "password" )
  VALUES ( ${name}, ${email}, ${password} )
    RETURNING id, name, email;