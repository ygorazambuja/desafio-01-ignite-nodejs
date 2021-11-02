const users = [];

function existsUserWithUsername(username) {
  return users.find((user) => user.username === username);
}

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  if (!username) {
    return response.status(400).json({ error: "Missing username" });
  }

  const user = existsUserWithUsername(username);

  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }

  request.user = user;
  next();
}

module.exports = {
  checksExistsUserAccount,
  existsUserWithUsername,
  users,
};
