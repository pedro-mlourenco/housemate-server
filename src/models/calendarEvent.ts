import * as mongodb from "mongodb";

export interface CalendarEvent {
    title: string;
    description?: string;
    date: Date;
    startTime?: string;
    endTime?: string;
    location?: string;
    type: "Birthday" | "Event" | "Task" | "Work" | "Other";
    owner: mongodb.ObjectId;
}

export const calendarEventSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["title", "date", "type", "owner"],
        additionalProperties: false,
        properties: {
            _id: {},
            title: {
                bsonType: "string",
                description: "'title' is required and must be a string",
            },
            description: {
                bsonType: "string",
                description: "'description' is required and must be a string",
            },
            date: {
                bsonType: "date",
                description: "'date' is required and must be a date",
            },
            startTime: {
                bsonType: "startTime",
                description: "'startTime' is required and must be a date",
            },
            endTime: {
                bsonType: "endTime",
                description: "'endTime' is required and must be a date",
            },
            location: {
                bsonType: "location",
                description: "'location' is required and must be a date",
            },
            type: {
                bsonType: "string",
                description: "'type' must be on of the following values: 'Birthday', 'Event', 'Task', 'Work', 'Other'",
                enum: ["Birthday", "Event", "Task", "Work", "Other"],
            },
            owner: {
                bsonType: "objectId",
                description: "'owner' is required and must be an objectId",
            }
        },
    },
};