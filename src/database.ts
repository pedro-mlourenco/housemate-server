import * as mongodb from "mongodb";
import { User, UserRole,userSchema } from "./models/user";
import { TokenBlacklist,tokenSchema } from "./models/token";
import { Item,itemSchema } from "./models/item"; 
import { Store, storeSchema } from "./models/store";
import { Recipe, recipeSchema } from "./models/recipe";
import { CalendarEvent,calendarEventSchema } from "./models/calendarEvent";

export const collections: {
  items?: mongodb.Collection<Item>;
  stores?: mongodb.Collection<Store>;
  users?: mongodb.Collection<User>;
  tokenBlacklist?: mongodb.Collection<TokenBlacklist>;
  recipes?: mongodb.Collection<Recipe>;
  calendarEvents?: mongodb.Collection<CalendarEvent>;
} = {};

export async function connectToDatabase(
  uri: string
): Promise<mongodb.MongoClient> {
  const client = new mongodb.MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    // Initialize collections
    collections.items = db.collection<Item>("items");
    collections.stores = db.collection<Store>("stores");
    collections.users = db.collection<User>("users");
    collections.tokenBlacklist = db.collection<TokenBlacklist>("tokenBlacklist");
    collections.recipes = db.collection<Recipe>("recipes");
    collections.calendarEvents = db.collection<CalendarEvent>("calendarEvents");
    // Add schema validation
    await Promise.all([
      db
        .command({
          collMod: "users",
          validator: userSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", { validator: userSchema });
          }
        }),
      db
        .command({
          collMod: "items",
          validator: itemSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("items", { validator: itemSchema });
          }
        }),
      db
        .command({
          collMod: "stores",
          validator: storeSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("stores", { validator: storeSchema });
          }
        }),
        db
        .command({
          collMod: "tokenBlacklist",
          validator: tokenSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("tokens", { validator: tokenSchema });
          }
        }),
        db
        .command({
          collMod: "recipes",
          validator: recipeSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("recipes", { validator: recipeSchema });
          }
        }), db
        .command({
          collMod: "calendarEvents",
          validator: calendarEventSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("calendarEvents", { validator: calendarEventSchema });
          }
        })
    ]);

    return client;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
