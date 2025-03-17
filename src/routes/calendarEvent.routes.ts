import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { authenticateToken } from "../middleware/auth.middleware";
import { CalendarEvent } from "../models/calendarEvent";

function isValidTimeFormat(time: string): boolean {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}

export const calendarRouter = express.Router();
calendarRouter.use(express.json());

// CREATE - New Calendar Event
calendarRouter.post("/", authenticateToken, async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).send("User not authenticated");
        }

        const newEvent: CalendarEvent = req.body as CalendarEvent;
        
        // Validate date
        if (isNaN(new Date(newEvent.date).getTime())) {
            return res.status(400).send("Invalid date format");
        }
        
        // Validate time formats
        if (newEvent.startTime && !isValidTimeFormat(newEvent.startTime)) {
            return res.status(400).send("Invalid start time format");
        }
        if (newEvent.endTime && !isValidTimeFormat(newEvent.endTime)) {
            return res.status(400).send("Invalid end time format");
        }
        
        // Validate event type
        if (!["Birthday", "Event", "Task", "Work", "Other"].includes(newEvent.type)) {
            return res.status(400).send("Invalid event type");
        }

        const newEventWithOwner: CalendarEvent = {
            ...newEvent,
            owner: new ObjectId(req.user.id),
            date: new Date(newEvent.date)
        };

        const result = await collections.calendarEvents?.insertOne(newEventWithOwner);

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
calendarRouter.get("/", authenticateToken, async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).send("User not authenticated");
        }

        const events = await collections.calendarEvents?.find({
            owner: new ObjectId(req.user.id)
        }).toArray();
        
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
        if (!req.user?.id) {
            return res.status(401).send("User not authenticated");
        }

        const startDate = new Date(req.params.start);
        const endDate = new Date(req.params.end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).send("Invalid date format");
        }

        const events = await collections.calendarEvents?.find({
            owner: new ObjectId(req.user.id),
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

