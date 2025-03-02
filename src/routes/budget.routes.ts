import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { authenticateToken } from "../middleware/auth.middleware";
import { Budget } from "../models/budget";

export const budgetRouter = express.Router();
budgetRouter.use(express.json());

// CREATE - New Budget
budgetRouter.post("/", authenticateToken, async (req, res) => {
    try {
        const newBudget: Budget = req.body as Budget;
        const result = await collections.budgets?.insertOne(newBudget);

        if (result?.acknowledged) {
            res.status(201).send(`Created new budget: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create budget");
        }
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// READ - Get All Budgets
budgetRouter.get("/", authenticateToken, async (_req, res) => {
    try {
        const budgets = await collections.budgets?.find({}).toArray();
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// READ - Get Budget by ID
budgetRouter.get("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const budget = await collections.budgets?.findOne({ _id: id });

        if (budget) {
            res.status(200).json(budget);
        } else {
            res.status(404).send(`Budget with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// UPDATE - Update Budget
budgetRouter.put("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updatedBudget: Budget = req.body as Budget;
        const result = await collections.budgets?.updateOne(
            { _id: id },
            { $set: updatedBudget }
        );

        if (result && result.matchedCount) {
            res.status(200).send(`Updated budget: ID ${id}`);
        } else {
            res.status(404).send(`Budget with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// DELETE - Delete Budget
budgetRouter.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await collections.budgets?.deleteOne({ _id: id });

        if (result && result.deletedCount) {
            res.status(202).send(`Removed budget: ID ${id}`);
        } else {
            res.status(404).send(`Budget with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// CREATE - Add Entry to Budget
budgetRouter.post("/:id/entries", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const newEntry = req.body;
        const result = await collections.budgets?.updateOne(
            { _id: id },
            { $push: { entries: newEntry } }
        );

        if (result && result.matchedCount) {
            res.status(201).send(`Added entry to budget: ID ${id}`);
        } else {
            res.status(404).send(`Budget with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res
          .status(400)
          .send(error instanceof Error ? error.message : "Unknown error");
      }
});

// DELETE - Remove Entry from Budget
budgetRouter.delete("/:id/entries/:entryIndex", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const entryIndex = parseInt(req.params.entryIndex);
        
        const result = await collections.budgets?.updateOne(
            { _id: id },
            { $unset: { [`entries.${entryIndex}`]: 1 } }
        );
        
        if (result && result.matchedCount) {
            await collections.budgets?.updateOne(
                { _id: id },
                { $pull: { entries: collections.budgets?.findOne({entries: [`entries.${entryIndex}`]}) } }
            );
            res.status(202).send(`Removed entry from budget: ID ${id}`);
        } else {
            res.status(404).send(`Budget with ID ${id} not found`);
        }
    } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});