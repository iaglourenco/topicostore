import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import BuyRecord from "../models/BuyRecord";
import Product from "../models/Product";
import * as Yup from "yup";
import buy_view from "../views/buy_view";

interface Order {
  product_id: number;
  amount: number;
}
export default {
  async index(req: Request, res: Response) {
    const { user } = req.body;
    const buyHistoryRepository = getRepository(BuyRecord);
    const a = await buyHistoryRepository.find({
      relations: ["products"],
    });
    return res.json(a);
  },

  async create(req: Request, res: Response) {
    const { user } = req.body;
    const products = req.body.products as Order[];

    const productsRepository = getRepository(Product);
    const buyHistoryRepository = getRepository(BuyRecord);

    const orderData = {
      user,
      products,
    };

    const schema = Yup.object().shape({
      user: Yup.string().required(),
      products: Yup.array(
        Yup.object().shape({
          product_id: Yup.number().required(),
          amount: Yup.number().required(),
        })
      ).required(),
    });

    await schema.validate(orderData, { abortEarly: false });

    const orderProducts = await getManager()
      .createQueryBuilder(Product, "product")
      .where("product.id IN (:...products)", {
        products: products.map((product) => product.product_id),
      })
      .getMany();

    let saleTotal = 0;

    orderProducts.forEach((product) => {
      products.forEach((orderProduct) => {
        if (product.id === orderProduct.product_id) {
          saleTotal += product.price * orderProduct.amount;
          return;
        }
      });
    });

    const buyHistory = buyHistoryRepository.create({
      data: Date.now(),
      total: saleTotal,
      status: "PENDING",
      enviado: false,
      user,
      products: orderProducts,
    });
    await buyHistoryRepository.save(buyHistory);

    return res.json(buy_view.render(buyHistory));
  },
};
