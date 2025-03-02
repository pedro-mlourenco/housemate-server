import { ObjectId } from "mongodb";
export interface Budget{
    title: string;
    notes?: string;
    entries?: BudgetEntry[];
}

export enum SpendingCategory {
    INMONEY = 'Income',
    GOAL = 'Goals',
    INFOOD = 'Groceries',
    OUTFOOD = 'Eating out',
    TRANSPORT = 'Transport',
    UTILS = 'Utilities',
    FUN = 'Entertainment',
    HEALTH = 'Health',
    SHOPPING = 'Shopping',
    TRAVEL = 'Travel',
    OTHER = 'Other'
}

export interface BudgetEntry {
    category: SpendingCategory;
    amount: number;
    date: Date;
    week: number;
    notes?: string;
}

export const budgetSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId"
            },
            title: {
                bsonType: "string",
                description: "'title' is required and must be a string"
            },
            notes: {
                bsonType: "string",
                description: "'notes' must be a string"
            },
            entries: {
                bsonType: "array",
                description: "Array of budget entries",
                items: {
                    bsonType: "object",
                    required: ["category", "amount", "date", "week"],
                    properties: {
                        category: {
                            bsonType: "string",
                            description: "'category' must be one of the predefined spending categories",
                            enum: [
                                "Income",
                                "Goals",
                                "Groceries",
                                "Eating out",
                                "Transport",
                                "Utilities",
                                "Entertainment",
                                "Health",
                                "Shopping",
                                "Travel",
                                "Other"
                            ]
                        },
                        amount: {
                            bsonType: "number",
                            description: "'amount' must be a number"
                        },
                        date: {
                            bsonType: "date",
                            description: "'date' must be a date"
                        },
                        week: {
                            bsonType: "number",
                            description: "'week' must be a number"
                        },
                        notes: {
                            bsonType: "string",
                            description: "'notes' must be a string"
                        }
                    }
                }
            }
        }
    }
};