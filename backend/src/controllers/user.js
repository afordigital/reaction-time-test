import * as userService from "../services/user.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
}

export const insertUser = async (req, res, next) => {
    try {
        const { name, score } = req.body;
        const result = await userService.insertUser(name, score);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { name, score } = req.body;
        const result = await userService.updateUser(req.params.id, name, score);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}