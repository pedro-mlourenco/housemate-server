import * as mongodb from "mongodb";

interface Barcode {
    barcode: string;
    expiryDate?: Date;
    price: number;
    datePurchased?: Date;
    store?: mongodb.ObjectId;
}

export interface Item {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    storageLocation: "Fridge" | "Pantry" | "Freezer";
    barcodes: Barcode[];
}

export const itemSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "category", "quantity", "unit", "storageLocation", "price", "barcodes", "store"],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and must be a string",
            },
            category: {
                bsonType: "string",
                description: "'category' is required and must be a string",
                enum: ["Dairy", "Vegetables", "Fruits", "Meat", "Grains", "Snacks", "Drinks", "Other"],
            },
            quantity: {
                bsonType: "int",
                description: "'quantity' is required and must be a positive integer",
                minimum: 1,
            },
            unit: {
                bsonType: "string",
                description: "'unit' is required and must be one of the predefined units",
                enum: ["pcs", "kg", "g", "liters", "ml", "pack", "bottle", "can", "box", "other"],
            },
            expiryDate: {
                bsonType: "date",
                description: "'expiryDate' is optional but must be a valid date if provided",
            },
            storageLocation: {
                bsonType: "string",
                description: "'storageLocation' is required and must be one of 'Fridge', 'Pantry', or 'Freezer'",
                enum: ["Fridge", "Pantry", "Freezer"],
            },
            price: {
                bsonType: "double",
                description: "'price' is required and must be a number",
            },
            barcodes: {
                bsonType: "array",
                description: "'barcodes' is required and must be an array of objects containing barcode information",
                items: {
                    bsonType: "object",
                    required: ["code"],
                    properties: {
                        code: {
                            bsonType: "string",
                            description: "'code' is required and must be a string",
                        },
                        store: {
                            bsonType: "objectId",
                            description: "'store' is optional but must reference a valid store",
                        },
                    },
                },
            },
            store: {
                bsonType: "objectId",
                description: "'store' is required and must reference a valid store",
            },
            datePurchased: {
                bsonType: "date",
                description: "'datePurchased' is optional but must be a valid date if provided",
            },
        },
    },
};