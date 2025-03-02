import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { authenticateToken } from "../middleware/auth.middleware";

export const calendarRouter = express.Router();
calendarRouter.use(express.json());