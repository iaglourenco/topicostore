import express from "express";
import path from "path";
import errorHandler from "./errors/handler";
const app = express();

app.use(cors());
app.use(express.json());
app.use("uploads", express.static(path.join(__dirname + "..", "uploads")));
