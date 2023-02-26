"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movieListModel_1 = require("../models/movieListModel");
const store = new movieListModel_1.MovieListModel();
const index = async (req, res) => {
    try {
        const movielist = await store.index();
        res.status(200).json(movielist);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const movielist = await store.show(parseInt(req.params.id));
        res.status(200).json(movielist);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    const movielist = {
        id: req.body.id,
        userListID: req.body.userListID,
        movieID: req.body.movie,
        name: req.body.name,
    };
    try {
        const movies = await store.create(movielist);
        res.status(200).json(movies);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const Delete = async (req, res) => {
    try {
        const movies = await store.delete(parseInt(req.params.id));
        res.status(200).json(movies);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const update = async (req, res) => {
    const movielist = {
        id: req.body.id,
        userListID: req.body.userListID,
        movieID: req.body.movie,
        name: req.body.name,
    };
    try {
        const movies = await store.update(parseInt(req.params.id), movielist);
        res.status(200).json(movies);
    }
    catch (err) {
        res.status(200).json(err);
    }
};
const movieListRoutes = (app) => {
    app.get("/movielist", index);
    app.post("/movielist/", create);
    app.get("movielist/:id", show);
    app.patch("movielist/:id", update);
    app.delete("movielist/:id", Delete);
};
exports.default = movieListRoutes;
