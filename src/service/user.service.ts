import mongoose, { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export interface userGetInput {
  _id?: string;
  email?: string;
  name?: string;
}

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// lohe

export async function getUser(input: userGetInput) {
  try {
    if (input._id) {
      return await UserModel.findById(input._id);
    }
    if (input.email && input.name) {
      return await UserModel.findOne({
        $or: [{ name: input.name }, { email: input.email }],
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
