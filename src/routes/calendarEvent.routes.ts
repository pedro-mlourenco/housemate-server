import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { authenticateToken } from "../middleware/auth.middleware";
import { CalendarEvent } from "../models/calendarEvent";

export const calendarRouter = express.Router();
calendarRouter.use(express.json());

// CREATE - New Calendar Event
calendarRouter.post("/", authenticateToken, async (req, res) => {
    try {
        const newEvent: CalendarEvent = req.body as CalendarEvent;
        const result = await collections.calendarEvents?.insertOne(newEvent);

        if (result?.acknowledged) {
            res.status(201).send(`Created new event: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create event");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// READ - Get All Events
calendarRouter.get("/", authenticateToken, async (_req, res) => {
    try {
        const events = await collections.calendarEvents?.find({}).toArray();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// READ - Get Event by ID
calendarRouter.get("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const event = await collections.calendarEvents?.findOne({ _id: id });

        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).send(`Event with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(404).send(`Event with ID ${req.params.id} not found`);
    }
});

// READ - Get Events by Date Range
calendarRouter.get("/range/:start/:end", authenticateToken, async (req, res) => {
    try {
        const startDate = new Date(req.params.start);
        const endDate = new Date(req.params.end);

        const events = await collections.calendarEvents?.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).toArray();

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// UPDATE - Update Event
calendarRouter.put("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updatedEvent: CalendarEvent = req.body as CalendarEvent;
        const result = await collections.calendarEvents?.updateOne(
            { _id: id },
            { $set: updatedEvent }
        );

        if (result && result.matchedCount) {
            res.status(200).send(`Updated event: ID ${id}`);
        } else {
            res.status(404).send(`Event with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// DELETE - Delete Event
calendarRouter.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await collections.calendarEvents?.deleteOne({ _id: id });

        if (result && result.deletedCount) {
            res.status(202).send(`Removed event: ID ${id}`);
        } else {
            res.status(404).send(`Event with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

