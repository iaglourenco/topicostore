import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";
import productView from "../views/products_view";
import * as Yup from "yup";
import productsView from "../views/products_view";

export default {
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();
    return res.json(productView.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOneOrFail(id);
    return res.json(productView.render(product));
  },

  async create(req: Request, res: Response) {
    const { name, user, description, price, category, brand, stock } = req.body;

    const productsRepository = getRepository(Product);

    const requestImgs = req.files as Express.Multer.File[];
    const images = requestImgs.map((img) => {
      return { path: img.filename };
    });

    const data = {
      name,
      description,
      price,
      images,
      brand,
      stock,
      category,
      user,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required().max(255),
      price: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ).required(),
      brand: Yup.string().required(),
      stock: Yup.number().required(),
      category: Yup.string().required(),
      user: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const product = productsRepository.create(data);

    await productsRepository.save(product);
    return res.status(201).json(productsView.render(product));
  },
};
