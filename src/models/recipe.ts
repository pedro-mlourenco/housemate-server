import * as mongodb from "mongodb";

export interface RecipeIngredient {
    itemObjId: mongodb.ObjectId;  // Reference to Item
    quantity: number;
    unit: string;
    notes?: string;
}

export interface Step {
    stepNumber: number;
    description: string;
    duration?: number;  // in minutes
}

export interface Recipe {
      _id: mongodb.ObjectId;
    name: string;
    description?: string;
    servings: number;
    prepTime: number;  // in minutes
    cookTime: number;  // in minutes
    ingredients: RecipeIngredient[];
    steps: Step[];
    category?: string[];  // e.g., ["Italian", "Vegetarian"]
    difficulty: "Easy" | "Medium" | "Hard";
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
    rating?: number;  // 1-5
    notes?: string;
}

export const recipeSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "servings", "prepTime", "cookTime", "ingredients", "steps", "difficulty", "createdAt", "updatedAt", "createdBy"],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and must be a string"
            },
            description: {
                bsonType: "string",
                description: "'description' is optional but must be a string if provided"
            },
            servings: {
                bsonType: "int",
                minimum: 1,
                description: "'servings' is required and must be a positive integer"
            },
            prepTime: {
                bsonType: "int",
                minimum: 0,
                description: "'prepTime' is required and must be a non-negative integer"
            },
            cookTime: {
                bsonType: "int",
                minimum: 0,
                description: "'cookTime' is required and must be a non-negative integer"
            },
            ingredients: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    required: ["item", "quantity", "unit"],
                    properties: {
                        item: {
                            bsonType: "objectId",
                            description: "'item' must reference an existing Item"
                        },
                        quantity: {
                            bsonType: "double",
                            minimum: 0,
                            description: "'quantity' must be a positive number"
                        },
                        unit: {
                            bsonType: "string",
                            description: "'unit' is required and must be a string"
                        },
                        notes: {
                            bsonType: "string",
                            description: "'notes' is optional but must be a string if provided"
                        }
                    }
                }
            },
            steps: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    required: ["stepNumber", "description"],
                    properties: {
                        stepNumber: {
                            bsonType: "int",
                            minimum: 1,
                            description: "'stepNumber' must be a positive integer"
                        },
                        description: {
                            bsonType: "string",
                            description: "'description' is required and must be a string"
                        },
                        duration: {
                            bsonType: "int",
                            minimum: 0,
                            description: "'duration' is optional but must be a non-negative integer if provided"
                        }
                    }
                }
            },
            category: {
                bsonType: "array",
                items: {
                    bsonType: "string"
                },
                description: "'category' is optional but must be an array of strings if provided"
            },
            difficulty: {
                enum: ["Easy", "Medium", "Hard"],
                description: "'difficulty' must be one of: Easy, Medium, Hard"
            },
            createdAt: {
                bsonType: "date",
                description: "'createdAt' is required and must be a date"
            },
            updatedAt: {
                bsonType: "date",
                description: "'updatedAt' is required and must be a date"
            },
            imageUrl: {
                bsonType: "string",
                description: "'imageUrl' is optional but must be a string if provided"
            },
            rating: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "'rating' is optional but must be an integer between 1 and 5 if provided"
            },
            notes: {
                bsonType: "string",
                description: "'notes' is optional but must be a string if provided"
            },
            createdBy: {
                bsonType: "objectId",
                description: "'createdBy' must reference the creating user"
            }
        }
    }
};