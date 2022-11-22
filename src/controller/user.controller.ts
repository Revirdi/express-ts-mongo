import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";
import { createUser, getUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const checkExisting = await getUser(req.body);
    if (checkExisting) {
      if (checkExisting.email === req.body.email)
        return res.status(400).send({ message: "Email is already exist" });
      else return res.status(400).send({ message: "Name is already exist" });
    }
    const user = await createUser(req.body);
    res.status(200).send({
      message: "Success create user",
      data: omit(user.toJSON(), "password"),
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
