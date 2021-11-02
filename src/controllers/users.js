const { v4: uuidv4 } = require("uuid");
const { existsUserWithUsername, users } = require("../middlewares/users");

function AddUserController(request, response) {
  const { name, username } = request.body;

  const userAlreadyExists = existsUserWithUsername(username);

  if (userAlreadyExists)
    return response.status(400).json({ error: "User already exists" });

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
}

module.exports = {
  AddUserController,
};
