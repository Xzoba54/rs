import { Response, Request } from "express";
import { Cleanup } from "../utils/cleanup";
import { db } from "../config/db";

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name || typeof name != "string") return res.json({ message: "Invalid data" }).status(400);

    const producerExist = await db.producer.findUnique({
      where: {
        name: Cleanup(name).toLowerCase(),
      },
    });

    if (producerExist) return res.json({ message: "The producer with this name already exists" }).status(400);

    await db.producer.create({
      data: {
        name: Cleanup(name).toLowerCase(),
      },
    });

    return res.json({ message: "Producer created successfully" }).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const producers = await db.producer.findMany({});

    return res.json(producers).status(200);
  } catch (e: any) {
    console.log(e);
  }
};
