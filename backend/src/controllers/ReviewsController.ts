import { Request, Response } from "express";
import { getRepository } from "typeorm";
import reviewsView from "../views/reviews_view";
import * as Yup from "yup";
import Review from "../models/Review";

export default {
  async index(req: Request, res: Response) {
    const reviewsRepository = getRepository(Review);
    const reviews = await reviewsRepository.find();
    return res.json(reviewsView.renderMany(reviews));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const reviewsRepository = getRepository(Review);
    const review = await reviewsRepository.findOneOrFail(id);
    return res.json(reviewsView.render(review));
  },

  async create(req: Request, res: Response) {
    const { opinion, stars, user, product } = req.body;
    const reviewsRepository = getRepository(Review);

    const data = {
      opinion,
      stars,
      user,
      product,
    };

    const schema = Yup.object().shape({
      opinion: Yup.string().required().max(255),
      stars: Yup.number().required().min(1).max(5),
      user: Yup.string().required().length(36),
      product: Yup.number().required(),
    });

    await schema.validate(data, { abortEarly: false });
    const review = reviewsRepository.create(data);

    await reviewsRepository.save(review);
    return res.status(201).json(reviewsView.render(review));
  },
};
