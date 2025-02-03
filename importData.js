// const mongoose = require('mongoose');
// const fs = require('fs');
// const path  = require('path')

// const model = require('./models/almModel');
// const connectDB = require("./config/db");

// //Database name 
// const DATABASE_NAME = "Practice";

// connectDB();

// const uploadInBatches = async (Model ,dataFile , batchSize = 10) => {

//     const dataExists = await checkExistingData(Model);

//     if(dataExists){
//         console.log("Data already exists. skipping upload")
//         return;
//     }
//     console.log("Model:",Model,"file:", dataFile)
//     const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8')); //Read the JSON file 

//     console.log(`Starting bulk upload for ${dataFile}`, data);

//     for(let i = 0; i < data.length; i += batchSize) {
//         const batch = data.slice(i, i + batchSize);  //split the data into batches it give slice(0,0+1000) => it take data from 0 to 999 , next i =1000 => slice(1000, 1000+1000)=> data from 1000 to 1999
//         await Model.insertMany(batch, {ordered : false})
//         .then((result) =>{
//             console.log(`Uploaded batch ${Math.floor(i / batchSize) + 1}`, result);
//         })
//         .catch((err) =>{
//             console.error(`Error iploading batch ${Math.floor(i / batchSize) + 1}`, err.message);
//         });
//     }
    
//     return `Bulk upload completed for ${Model.collection.name} in database ${DATABASE_NAME}`;
// };

// const checkExistingData = async (Model) =>{
// const count = await Model.countDocuments();
// if(count > 0){
//     console.log(`Collection ${Model.collection.name} already has ${count} documents.`);
//     return true;//data exists
// }
// return false; //no data
// };


// const importData = async () =>{
//     try{

//         const uploadAll =await Promise.all([
//             uploadInBatches(models.ALM,path.join(__dirname, '../data/users.json'))
//         ]);

//         console.log('Bulk upload completed successfully:', uploadAll);
//     } catch (error){
//         console.error('Bulk upload failed:', error);
//     } finally{
//         mongoose.connection.close();
//     }
// };

// importData();



// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const connectDB = require("./config/db");

// // Ensure correct model import
// const { ALM } = require('./models/almModel'); // Adjust this based on your file structure

// // Database name
// const DATABASE_NAME = "Practice";

// // Connect to MongoDB
// connectDB();

// const uploadInBatches = async (Model, dataFile, batchSize = 10) => {
//     try {
//         const dataExists = await checkExistingData(Model);

//         if (dataExists) {
//             console.log(" Data already exists. Skipping upload.");
//             return;
//         }

//         console.log("Model:", Model.modelName, "File:", dataFile);

//         const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8')); // Read JSON file
//         console.log(` Starting bulk upload for ${dataFile}, Total Records: ${data.length}`);

//         for (let i = 0; i < data.length; i += batchSize) {
//             const batch = data.slice(i, i + batchSize); // Split data into batches

//             await Model.insertMany(batch, { ordered: false })
//                 .then(() => console.log(` Uploaded batch ${Math.floor(i / batchSize) + 1}`))
//                 .catch((err) => console.error(` Error in batch ${Math.floor(i / batchSize) + 1}:`, err.message));
//         }

//         console.log(` Bulk upload completed for ${Model.collection.name} in database ${DATABASE_NAME}`);
//     } catch (error) {
//         console.error(" Error in upload process:", error.message);
//     }
// };

// const checkExistingData = async (Model) => {
//     try {
//         const count = await Model.countDocuments();
//         if (count > 0) {
//             console.log(` Collection '${Model.collection.name}' already has ${count} documents.`);
//             return true;
//         }
//     } catch (error) {
//         console.error(" Error checking existing data:", error.message);
//     }
//     return false; // No data
// };

// const importData = async () => {
//     try {
//         await mongoose.connection.once('open', async () => {
//             console.log(" MongoDB connected");

//             const dataFilePath = path.join(__dirname, 'data/users.json'); // Ensure correct path
//             await uploadInBatches(ALM, dataFilePath); // Use `ALM` model directly
//             await uploadInBatches(ALM, dataFilePath); // Use `ALM` model directly

//             console.log(' Bulk upload completed successfully');
//             mongoose.connection.close();
//         });
//     } catch (error) {
//         console.error(' Bulk upload failed:', error);
//         mongoose.connection.close();
//     }
// };

// // Start Import
// importData();


const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require("./config/db");

// Ensure correct model import
const { ALM } = require('./models/almModel'); // Adjust this based on your file structure
const { Qtest } = require('./models/almModel'); // Adjust this if you have a Qtest model

// Database name
const DATABASE_NAME = "Practice";

// Connect to MongoDB
connectDB();

const uploadInBatches = async (Model, dataFile, batchSize = 20) => {
    try {
        const dataExists = await checkExistingData(Model);

        if (dataExists) {
            console.log(" Data already exists. Skipping upload.");
            return;
        }

        console.log("Model:", Model.modelName, "File:", dataFile);

        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8')); // Read JSON file
        console.log(` Starting bulk upload for ${dataFile}, Total Records: ${data.length}`);

        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize); // Split data into batches

            await Model.insertMany(batch, { ordered: false })
                .then(() => console.log(` Uploaded batch ${Math.floor(i / batchSize) + 1}`))
                .catch((err) => console.error(` Error in batch ${Math.floor(i / batchSize) + 1}:`, err.message));
        }

        console.log(` Bulk upload completed for ${Model.collection.name} in database ${DATABASE_NAME}`);
    } catch (error) {
        console.error(" Error in upload process:", error.message);
    }
};

const checkExistingData = async (Model) => {
    try {
        const count = await Model.countDocuments();
        if (count > 0) {
            console.log(` Collection '${Model.collection.name}' already has ${count} documents.`);
            return true;
        }
    } catch (error) {
        console.error(" Error checking existing data:", error.message);
    }
    return false; // No data
};

const importData = async () => {
    try {
        await mongoose.connection.once('open', async () => {
            console.log(" MongoDB connected");

            const uploadAll = await Promise.all([
                uploadInBatches(ALM, path.join(__dirname, './data/users.json')),
                uploadInBatches(Qtest, path.join(__dirname, './data/qtest.json')),              
            ]);
    

            console.log(' Bulk upload completed successfully');
            mongoose.connection.close();
        });
    } catch (error) {
        console.error(' Bulk upload failed:', error);
        mongoose.connection.close();
    }
};

// Start Import
importData();
