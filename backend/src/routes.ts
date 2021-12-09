import Router from "express";
import UsersController from "./controllers/UsersControllers";
import multer from "multer";
import uploadConfig from "./config/upload";
import ProductsController from "./controllers/ProductsController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";
import ReviewsController from "./controllers/ReviewsController";
import BuyController from "./controllers/BuyController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/users", upload.array("images"), UsersController.create);
routes.get("/users", authMiddleware, UsersController.index);
routes.get("/users/:id", authMiddleware, UsersController.show);

routes.post("/products", upload.array("images"), ProductsController.create);
routes.get("/products", ProductsController.index);
routes.get("/products/:id", ProductsController.show);

// Buy products
//
routes.post("/buy", authMiddleware, BuyController.create);
routes.get("/buy", authMiddleware, BuyController.index);

// Review a product
// Body: opinion, stars, product
routes.post("/review", authMiddleware, ReviewsController.create);

routes.post("/auth", AuthController.authenticate);

export default routes;
