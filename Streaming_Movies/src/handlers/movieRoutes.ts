import express, { Request, Response } from "express";
import { Movies, MovieModel } from "../models/movieModel";

// const secret = process.env.TOKEN_SECRET as string;
const store = new MovieModel();

const index = async (req: Request, res: Response) => {
  try {
    const movies = await store.index();
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const movies = await store.show(parseInt(req.params.id));
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const movie: Movies = {
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    rate: req.body.rate,
  };
  try {
    const movies = await store.create(movie);
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const Delete = async (req: Request, res: Response) => {
  try {
    const movies = await store.delete(parseInt(req.params.id));
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const movie: Movies = {
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    rate: req.body.rate,
  };
  try {
    const movies = await store.update(parseInt(req.params.id), movie);
    res.status(200).json(movies);
  } catch (err) {
    res.status(200).json(err);
  }
};

const movieRoutes = (app: express.Application) => {
  app.get("/movies", index);
  app.post("/movies/", create);
  app.get("movies/:id", show);
  app.patch("movies/:id", update);
  app.delete("movies/:id", Delete);
};

export default movieRoutes;
