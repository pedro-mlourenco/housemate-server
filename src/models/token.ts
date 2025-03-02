export interface TokenBlacklist {
    token: string;
    expiresAt: Date;
  }

  export const tokenSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["token", "expiresAt"],
        additionalProperties: false,
        properties: {
            _id: {},
            token: {
                bsonType: "string",
                description: "'token' is required and must be a string"
            },
            expiresAt: {
                bsonType: "date",
                description: "'expiresAt' is required and must be a date"
            }
        }
    }
};