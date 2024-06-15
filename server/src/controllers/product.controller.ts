import { Request, Response } from "express";
import slugify from "slugify";
import { db } from "../config/db";
import { Cleanup } from "../utils/cleanup";

export const create = async (req: Request, res: Response) => {
  const { name, stock, price, category_name, producer_name } = req.body;

  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!name || !stock || !price || !category_name || !producer_name || !files) {
      return res.json({ message: "Invalid data" }).status(400);
    }

    const productExist = await db.product.findUnique({
      where: {
        name: Cleanup(name),
      },
    });

    if (productExist) return res.json({ message: "The product with this name already exists" });

    const category = await db.category.findUnique({
      where: {
        name: Cleanup(category_name).toLowerCase(),
      },
    });

    if (!category) return res.json({ message: "Category not found" }).status(400);

    const producer = await db.producer.findUnique({
      where: {
        name: Cleanup(producer_name).toLowerCase(),
      },
    });

    if (!producer) return res.json({ message: "Producer not found" }).status(400);

    const images = files.map((file: Express.Multer.File) => `http://localhost:${process.env.PORT || 8000}/public/uploads/${file.filename}`);

    const product = await db.product.create({
      data: {
        name: Cleanup(name),
        slug: slugify(name),
        images: images,
        stock: parseInt(stock),
        price: parseFloat(price),
        categoryId: category.id,
        producerId: producer.id,
      },
    });

    return res.json(product).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const getBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    if (!slug) return res.json({ message: "Invalid data" }).status(400);

    const product = await db.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        producer: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json(product).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await db.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        producer: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json(products).status(200);
  } catch (e: any) {
    console.log(e);
  }
};
