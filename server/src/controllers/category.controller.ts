import { Request, Response } from "express";
import { db } from "../config/db";
import { Cleanup } from "../utils/cleanup";

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name || typeof name != "string") return res.json({ message: "Invalid data" }).status(400);

    const categoryExist = await db.category.findUnique({
      where: {
        name: Cleanup(name).toLowerCase(),
      },
    });

    if (categoryExist) return res.json({ message: "The category with this name already exists" });

    await db.category.create({
      data: {
        name: Cleanup(name).toLowerCase(),
      },
    });

    return res.json({ message: "Category created successfully" }).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await db.category.findMany({});

    return res.json(categories);
  } catch (e: any) {
    console.log(e);
  }
};
