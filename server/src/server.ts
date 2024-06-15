import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

require("./config/passport-config");

import { AuthRouter } from "./routes/auth.route";
import { ProductRouter } from "./routes/product.route";
import { CategoryRouter } from "./routes/category.route";
import { ProducerRouter } from "./routes/producer.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.dirname(__dirname) + "/public"));

app.use("/api/auth", AuthRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/producer", ProducerRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`listening on port ${process.env.PORT || 8000}`);
});
