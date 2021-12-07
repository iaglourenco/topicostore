import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  async authenticate(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    await schema.validate(data, { abortEarly: false });

    const user = await usersRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET as string, {
      expiresIn: "1d",
    });

    delete data.password;

    return res.status(200).json({ data, token });
  },
};
