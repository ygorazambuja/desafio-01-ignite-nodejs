const { Router } = require("express");
const {
  GetTodosWithUsernameController,
  AddTodoWithUsernameController,
  UpdateTodoWithUsernameController,
  DeleteTodoWithUsernameController,
  ToggleTodoWithUsernameController,
} = require("../controllers/todos");
const { AddUserController } = require("../controllers/users");
const { checksExistsUserAccount } = require("../middlewares/users");

const routes = Router();

routes.post("/users", AddUserController);

routes.get("/todos", checksExistsUserAccount, GetTodosWithUsernameController);

routes.post("/todos", checksExistsUserAccount, AddTodoWithUsernameController);

routes.put(
  "/todos/:id",
  checksExistsUserAccount,
  UpdateTodoWithUsernameController
);

routes.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  ToggleTodoWithUsernameController
);

routes.delete(
  "/todos/:id",
  checksExistsUserAccount,
  DeleteTodoWithUsernameController
);

// routes.patch(
//   "/todos/:id/done",
//   checksExistsUserAccount,
//   (request, response) => {
//     // Complete aqui
//   }
// );

module.exports = {
  routes,
};
