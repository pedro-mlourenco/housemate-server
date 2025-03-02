import { ObjectId } from "mongodb";

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  createdAt: Date;
}

export const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "password", "name", "role", "createdAt"],
    properties: {
      email: {
        bsonType: "string",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      },
      password: {
        bsonType: "string",
        minLength: 6
      },
      name: {
        bsonType: "string"
      },
      role: {
          enum: [UserRole.USER, UserRole.ADMIN],
          default: UserRole.USER
        },
      createdAt: {
        bsonType: "date"
      }
    }
  }
};