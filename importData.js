// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const connectDB = require("./config/db");
// const { ALM, Qtest, Valuefile } = require("./models/almModel");

// const DATABASE_NAME = "Practice";

// connectDB();

// const uploadInBatches = async (Model, dataFile, batchSize = 14, isObject = false) => {
//     try {
//         if (!fs.existsSync(dataFile)) {
//             console.log(`Error: File not found at ${dataFile}`);
//             return;
//         }

//         const fileContent = fs.readFileSync(dataFile, "utf-8");
//         let data = JSON.parse(fileContent);

//         if (isObject && data.entities) {
//             data = data.entities;
//         }

//         if (!Array.isArray(data)) {
//             console.error(`Error: Expected an array in ${dataFile}, but got ${typeof data}`);
//             return;
//         }

//         // Clear existing data before inserting new data
//         await Model.deleteMany({});
//         console.log(`Cleared existing data in '${Model.collection.name}' collection`);

//         console.log(`Starting bulk upload for ${dataFile}, Total Records: ${data.length}`);

//         for (let i = 0; i < data.length; i += batchSize) {
//             const batch = data.slice(i, i + batchSize);
//             try {
//                 await Model.insertMany(batch, { ordered: false });
//                 console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1}`);
//             } catch (err) {
//                 console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, err.message);
//             }
//         }

//         console.log(`Bulk upload completed for '${Model.collection.name}' in database '${DATABASE_NAME}'`);
//     } catch (error) {
//         console.error("Error in upload process:", error.message);
//     }
// };

// const importData = async () => {
//     try {
//         mongoose.connection.once("open", async () => {
//             console.log("MongoDB connected");

//             await Promise.all([
//                 uploadInBatches(ALM, path.join(__dirname, "./data/users.json")),
//                 uploadInBatches(Qtest, path.join(__dirname, "./data/qtest.json")),
//                 uploadInBatches(Valuefile, path.join(__dirname, "./data/valuefile.json"), 14, true)
//             ]);

//             console.log("Bulk upload completed successfully");
//             mongoose.connection.close();
//         });
//     } catch (error) {
//         console.error("Bulk upload failed:", error);
//         mongoose.connection.close();
//     }
// };

// importData();



// importData.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");
const { ALM, Qtest, Valuefile } = require("./models/almModel");

const uploadInBatches = async (Model, dataFile, batchSize = 14, isValueFile = false) => {
    try {
        // Check if file exists
        if (!fs.existsSync(dataFile)) {
            throw new Error(`File not found: ${dataFile}`);
        }

        // Read and parse data
        const fileContent = fs.readFileSync(dataFile, "utf-8");
        let data = JSON.parse(fileContent);

        // Handle Valuefile special case
        if (isValueFile) {
            if (!data.entities) {
                throw new Error("Invalid Valuefile format");
            }
            // Clear existing data
            await Model.deleteMany({});
            // Insert new data
            await Model.create(data);
            console.log(`Uploaded Valuefile data successfully`);
            return;
        }

        // For ALM and Qtest collections
        if (!Array.isArray(data)) {
            throw new Error(`Expected array in ${dataFile}`);
        }

        // Clear existing data
        await Model.deleteMany({});
        console.log(`Cleared existing data in '${Model.collection.name}'`);

        // Process in batches
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            try {
                await Model.insertMany(batch, { ordered: false });
                console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(data.length / batchSize)}`);
            } catch (err) {
                console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, err.message);
            }
        }

        console.log(`Completed upload for '${Model.collection.name}'`);
    } catch (error) {
        console.error(`Error processing ${Model.collection.name}:`, error.message);
    }
};

const importData = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Import data sequentially to avoid overwhelming the database
        console.log("Starting ALM data import...");
        await uploadInBatches(ALM, path.join(__dirname, "./data/users.json"));
        
        console.log("Starting Qtest data import...");
        await uploadInBatches(Qtest, path.join(__dirname, "./data/qtest.json"));
        
        console.log("Starting Valuefile data import...");
        await uploadInBatches(Valuefile, path.join(__dirname, "./data/valuefile.json"), 14, true);

        console.log("All data imported successfully");
    } catch (error) {
        console.error("Import failed:", error);
    } finally {
        // Close the connection
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed");
        } catch (err) {
            console.error("Error closing MongoDB connection:", err);
        }
        // Exit the process
        process.exit(0);
    }
};

// Run the import
importData();