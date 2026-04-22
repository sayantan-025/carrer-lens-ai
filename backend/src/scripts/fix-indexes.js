const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const fixIndexes = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const collection = mongoose.connection.collection("users");
    
    // List current indexes
    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes.map(idx => idx.name));

    // Check if userName_1 exists
    if (indexes.some(idx => idx.name === "userName_1")) {
      console.log("Dropping userName_1 index...");
      await collection.dropIndex("userName_1");
      console.log("Successfully dropped userName_1 index.");
    } else {
      console.log("userName_1 index not found. Nothing to drop.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error fixing indexes:", err);
    process.exit(1);
  }
};

fixIndexes();
