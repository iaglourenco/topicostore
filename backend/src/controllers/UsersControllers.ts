import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

export default {
  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.json(users);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail(id);
    return res.json(user);
  },

  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const usersRepository = getRepository(User);

    const user = usersRepository.create({
      first_name,
      last_name,
      email,
      password,
    });

    await usersRepository.save(user);
    return res.status(201).json(user);
  },
};
