// // importData.js
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const connectDB = require("./config/db");
// const { ALM, Qtest, Valuefile } = require("./models/almModel");
// const { almFields ,qTestFields } = require("./models/statusModel");

// const uploadInBatches = async (Model, dataFile, batchSize = 14, isValueFile = false) => {
//     try {
//         // Check if file exists
//         if (!fs.existsSync(dataFile)) {
//             throw new Error(`File not found: ${dataFile}`);
//         }

//         // Read and parse data
//         const fileContent = fs.readFileSync(dataFile, "utf-8");
//         let data = JSON.parse(fileContent);

//         // Handle Valuefile special case
//         if (isValueFile) {
//             if (!data.entities) {
//                 throw new Error("Invalid Valuefile format");
//             }
//             // Clear existing data
//             await Model.deleteMany({});
//             // Insert new data
//             await Model.create(data);
//             console.log(`Uploaded Valuefile data successfully`);
//             return;
//         }

//         // For ALM and Qtest collections
//         if (!Array.isArray(data)) {
//             throw new Error(`Expected array in ${dataFile}`);
//         }

//         // Clear existing data
//         await Model.deleteMany({});
//         console.log(`Cleared existing data in '${Model.collection.name}'`);

//         // Process in batches
//         for (let i = 0; i < data.length; i += batchSize) {
//             const batch = data.slice(i, i + batchSize);
//             try {
//                 await Model.insertMany(batch, { ordered: false });
//                 console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(data.length / batchSize)}`);
//             } catch (err) {
//                 console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, err.message);
//             }
//         }

//         console.log(`Completed upload for '${Model.collection.name}'`);
//     } catch (error) {
//         console.error(`Error processing ${Model.collection.name}:`, error.message);
//     }
// };

// const importData = async () => {
//     try {
//         // Connect to MongoDB
//         await connectDB();

//         // Import data sequentially to avoid overwhelming the database
//         console.log("Starting ALM data import...");
//         await uploadInBatches(ALM, path.join(__dirname, "./data/users.json"));
        
//         console.log("Starting Qtest data import...");
//         await uploadInBatches(Qtest, path.join(__dirname, "./data/qtest.json"));
        
//         console.log("Starting Valuefile data import...");
//         await uploadInBatches(Valuefile, path.join(__dirname, "./data/valuefile.json"), 14, true);

//         console.log("Starting almFields data import...");
//         await uploadInBatches(almFields, path.join(__dirname, "./data/almfields,json"));

//         console.log("Starting qTestFields data import...");
//         await uploadInBatches(qTestFields, path.join(__dirname, "./data/qTestfields,json"));



//         console.log("All data imported successfully");
//     } catch (error) {
//         console.error("Import failed:", error);
//     } finally {
//         // Close the connection
//         try {
//             await mongoose.connection.close();
//             console.log("MongoDB connection closed");
//         } catch (err) {
//             console.error("Error closing MongoDB connection:", err);
//         }
//         // Exit the process
//         process.exit(0);
//     }
// };

// // Run the import
// importData();



const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");
const { ALM, Qtest, Valuefile } = require("./models/almModel");
const { almFields, qTestFields } = require("./models/statusModel");

const uploadInBatches = async (Model, dataFile, batchSize = 14, isValueFile = false) => {
    try {
        if (!fs.existsSync(dataFile)) {
            throw new Error(`File not found: ${dataFile}`);
        }

        const fileContent = fs.readFileSync(dataFile, "utf-8");
        let data = JSON.parse(fileContent);

        if (isValueFile) {
            if (!data.entities) {
                throw new Error("Invalid Valuefile format");
            }
            await Model.deleteMany({});
            await Model.create(data);
            console.log(`Uploaded Valuefile data successfully`);
            return;
        }

        if (!Array.isArray(data)) {
            throw new Error(`Expected array in ${dataFile}`);
        }

        await Model.deleteMany({});
        console.log(`Cleared existing data in '${Model.collection.name}'`);

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
        await connectDB();

        console.log("Starting ALM data import...");
        await uploadInBatches(ALM, path.join(__dirname, "./data/users.json"));

        console.log("Starting Qtest data import...");
        await uploadInBatches(Qtest, path.join(__dirname, "./data/qtest.json"));

        console.log("Starting Valuefile data import...");
        await uploadInBatches(Valuefile, path.join(__dirname, "./data/valuefile.json"), 14, true);

        console.log("Starting almFields data import...");
        await uploadInBatches(almFields, path.join(__dirname, "./data/almfields.json"));  // Fixed file name

        console.log("Starting qTestFields data import...");
        await uploadInBatches(qTestFields, path.join(__dirname, "./data/qTestfields.json"));  // Fixed file name

        console.log("All data imported successfully");
    } catch (error) {
        console.error("Import failed:", error);
    } finally {
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed");
        } catch (err) {
            console.error("Error closing MongoDB connection:", err);
        }
        process.exit(0);
    }
};

// Run the import
importData();
