import Router from "express";
import UsersController from "./controllers/UsersControllers";
import multer from "multer";
import uploadConfig from "./config/upload";
import ProductsController from "./controllers/ProductsController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/users", upload.array("images"), UsersController.create);
routes.get("/users", authMiddleware, UsersController.index);
routes.get("/users/:id", authMiddleware, UsersController.show);

routes.post("/products", upload.array("images"), ProductsController.create);
routes.get("/products", ProductsController.index);
routes.get("/products/:id", ProductsController.show);

routes.post("/auth", AuthController.authenticate);

export default routes;
