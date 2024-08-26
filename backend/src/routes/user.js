import * as userController from "../controllers/user.js";

// User routes
export default (router) => {
    router.get("/users", userController.getUsers);
    router.post("/user", userController.insertUser);
    router.put("/user/:id", userController.updateUser);
}