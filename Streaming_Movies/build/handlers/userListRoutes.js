"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userListModel_1 = require("../models/userListModel");
// const secret = process.env.TOKEN_SECRET as string;
const store = new userListModel_1.userListModel();
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
    const userlist = {
        userID: req.body.userID,
        movieID: req.body.movie,
    };
    try {
        const users = await store.create(userlist);
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
    const userlist = {
        userID: req.body.userID,
        movieID: req.body.movie,
    };
    try {
        const users = await store.update(parseInt(req.params.id), userlist);
        res.status(200).json(users);
    }
    catch (err) {
        res.status(200).json(err);
    }
};
const userListRoutes = (app) => {
    app.get("/userlist", index);
    app.post("/userlist/", create);
    app.get("userlist/:id", show);
    app.patch("userlist/:id", update);
    app.delete("userlist/:id", Delete);
};
exports.default = userListRoutes;
