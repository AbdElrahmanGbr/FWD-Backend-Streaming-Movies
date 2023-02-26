"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
// const secret = process.env.TOKEN_SECRET as string;
const store = new userModel_1.UserModel();
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const users = await store.show(parseInt(req.params.id));
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const users = await store.create(user);
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const Delete = async (req, res) => {
    try {
        const users = await store.delete(parseInt(req.params.id));
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const update = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const users = await store.update(parseInt(req.params.id), user);
        res.status(200).json(users);
    }
    catch (err) {
        res.status(200).json(err);
    }
};
const userRoutes = (app) => {
    app.get("/users", index);
    app.post("/users/", create);
    app.get("users/:id", show);
    app.patch("users/:id", update);
    app.delete("users/:id", Delete);
};
exports.default = userRoutes;
