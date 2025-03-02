
import * as mongodb from "mongodb";

export interface Store {
  name: string;
  location: string;
  contactNumber: string;
  website: string;
}

export const storeSchema = {
  $jsonSchema: {
      bsonType: "object",
      required: ["name", "location"],
      additionalProperties: false,
      properties: {
          _id: {},
          name: {
              bsonType: "string",
              description: "'name' is required and must be a string",
          },
          location: {
              bsonType: "string",
              description: "'location' is required and must be a string",
          },
          contactNumber: {
              bsonType: "string",
              description: "'contactNumber' is optional but must be a string if provided",
          },
          website: {
              bsonType: "string",
              description: "'website' is optional but must be a string if provided",
          },
      },
  },
};