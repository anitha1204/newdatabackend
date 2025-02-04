const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require("./config/db");
const { ALM, Qtest } = require('./models/almModel');  // Corrected import

const DATABASE_NAME = "Practice";

connectDB();

const uploadInBatches = async (Model, dataFile, batchSize = 14) => {
    try {
        const dataExists = await checkExistingData(Model);

        // Clear existing data in the collection before uploading
        if (dataExists) {
            console.log(`Clearing existing data in '${Model.collection.name}' collection`);
            await Model.deleteMany(); // Clears the collection
        }

        console.log("Model:", Model.modelName, "File:", dataFile);

        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8')); // Read JSON file
        console.log(`Starting bulk upload for ${dataFile}, Total Records: ${data.length}`);

        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize); // Split data into batches

            await Model.insertMany(batch, { ordered: false })
                .then(() => console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1}`))
                .catch((err) => console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, err.message));
        }

        console.log(`Bulk upload completed for ${Model.collection.name} in database ${DATABASE_NAME}`);
    } catch (error) {
        console.error("Error in upload process:", error.message);
    }
};

const checkExistingData = async (Model) => {
    try {
        const count = await Model.countDocuments();
        if (count > 0) {
            console.log(`Collection '${Model.collection.name}' already has ${count} documents.`);
            return true;
        }
    } catch (error) {
        console.error("Error checking existing data:", error.message);
    }
    return false; // No data
};

const importData = async () => {
    try {
        await mongoose.connection.once('open', async () => {
            console.log("MongoDB connected");

            // Batch upload ALM and Qtest data
            const uploadAll = await Promise.all([
                uploadInBatches(ALM, path.join(__dirname, './data/users.json')),
                uploadInBatches(Qtest, path.join(__dirname, './data/qtest.json'))
            ]);

            console.log('Bulk upload completed successfully');
            mongoose.connection.close();
        });
    } catch (error) {
        console.error('Bulk upload failed:', error);
        mongoose.connection.close();
    }
};

// Start the import
importData();
