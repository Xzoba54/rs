import { Router } from "express";
import * as Controller from "../controllers/producer.controller";

const router: Router = Router();

router.post("/new", Controller.create);
router.get("/", Controller.getAll);

export { router as ProducerRouter };
