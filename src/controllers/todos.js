const { v4: uuidv4 } = require("uuid");

function GetTodosWithUsernameController(request, response) {
  const { user } = request;

  return response.json(user.todos);
}

function AddTodoWithUsernameController(request, response) {
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
}

function UpdateTodoWithUsernameController(request, response) {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline, done } = request.body;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  if (done) {
    todo.done = done;
  }

  return response.json(todo);
}

function DeleteTodoWithUsernameController(request, response) {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  user.todos = user.todos.filter((todo) => todo.id !== id);

  return response.status(204).json(user);
}

function ToggleTodoWithUsernameController(request, response) {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  todo.done = !todo.done;

  return response.json(todo);
}
module.exports = {
  GetTodosWithUsernameController,
  AddTodoWithUsernameController,
  UpdateTodoWithUsernameController,
  DeleteTodoWithUsernameController,
  ToggleTodoWithUsernameController,
};
