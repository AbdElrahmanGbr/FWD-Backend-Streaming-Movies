import express, { Request, Response } from "express";
import { User, UserModel } from "../models/userModel";

// const secret = process.env.TOKEN_SECRET as string;
const store = new UserModel();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const users = await store.show(parseInt(req.params.id));
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const users = await store.create(user);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const Delete = async (req: Request, res: Response) => {
  try {
    const users = await store.delete(parseInt(req.params.id));
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const users = await store.update(parseInt(req.params.id), user);
    res.status(200).json(users);
  } catch (err) {
    res.status(200).json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users/", create);
  app.get("users/:id", show);
  app.patch("users/:id", update);
  app.delete("users/:id", Delete);
};

export default userRoutes;
