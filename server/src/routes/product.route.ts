import { Router } from "express";
import upload from "../utils/multer";
import * as Controller from "../controllers/product.controller";

const router: Router = Router();

router.post("/new", upload.array("images", 6), Controller.create);
router.get("/", Controller.getAll);
router.get("/:slug", Controller.getBySlug);

export { router as ProductRouter };
