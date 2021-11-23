import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";

export default {
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();
    return res.json(products);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOneOrFail(id);
    return res.json(product);
  },

  async create(req: Request, res: Response) {
    const { name, user, description, price } = req.body;

    const productsRepository = getRepository(Product);

    const requestImgs = req.files as Express.Multer.File[];
    const images = requestImgs.map((img) => {
      return { path: img.filename };
    });
    const product = productsRepository.create({
      name,
      description,
      price,
      images,
      user,
    });

    await productsRepository.save(product);
    return res.status(201).json(product);
  },
};
