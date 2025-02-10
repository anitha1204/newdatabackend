// const { Valuefile } = require("../models/almModel");
// const Newfile = require("../models/newfileModel");

// // Save a new mapping and store it in another collection
// exports.newfiledata = async (req, res) => {
//   try {
//     const { almName } = req.body;

//     // Find the entry where entities.Fields.Name matches almName
//     const Newdatafile = await Valuefile.findOne(
//       { "entities.Fields.Name": almName },
//       { "entities.Fields.Name": 1, "entities.Fields.values.value": 1, _id: 0 } // Select Name and values field
//     );

//     if (!Newdatafile) {
//       return res.status(404).json({ almName: null, message: "No matching record found" });
//     }

//     // Extract the exact matched Name and values
//     let matchedField = null;
//     Newdatafile.entities.forEach(entity => {
//       const field = entity.Fields.find(f => f.Name === almName);
//       if (field) {
//         matchedField = field; // Store the entire field (Name & values)
//       }
//     });

//     if (!matchedField) {
//       return res.status(404).json({ almName: null, message: "No matching field found" });
//     }

//     // Save the matched field to Newfile collection
//     const newEntry = new Newfile({
//       Name: matchedField.Name,
//       values: matchedField.values.value, // Store values array
//     });

//     await newEntry.save();

//     res.status(200).json({ almName: matchedField.Name, message: "Mapping saved successfully in Newfile" });

//   } catch (error) {
//     res.status(500).json({ message: "Error processing mapping", error });
//   }
// };






const { Valuefile } = require("../models/almModel");
const Newfile = require("../models/newfileModel");

// Save a new mapping and store it in another collection
exports.newfiledata = async (req, res) => {
  try {
    const { almName, qtestId } = req.body;

    // Find the matching record in Valuefile collection
    const Newdatafile = await Valuefile.findOne(
      { "entities.Fields.Name": almName },
      { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
    );

    if (!Newdatafile) {
      return res.status(404).json({ almName: null, message: "No matching record found" });
    }

    let matchedField = null;
    Newdatafile.entities.forEach(entity => {
      const field = entity.Fields.find(f => f.Name === almName);
      if (field) {
        matchedField = field;
      }
    });

    if (!matchedField) {
      return res.status(404).json({ almName: null, message: "No matching field found" });
    }

    const valueToStore = matchedField.values.length > 0 ? matchedField.values[0].value : null;

    if (!valueToStore) {
      return res.status(400).json({ message: "No value found for the specified field" });
    }

    // Find existing QTest document or create a new one
    let qtestDoc = await QTest.findOne({ name: almName });

    if (!qtestDoc) {
      qtestDoc = new QTest({
        name: almName,
        properties: []
      });
    }

    // Push new data into properties array
    qtestDoc.properties.push({
      Name: matchedField.Name,
      qtestId: qtestId,
      value: valueToStore
    });

    await qtestDoc.save();

    res.status(200).json({ almName: matchedField.Name, value: valueToStore, qtestId, message: "Mapping saved successfully in Newfile" });

  } catch (error) {
    res.status(500).json({ message: "Error processing mapping", error });
  }
};

exports.getMappedData = async (req, res) => {
  try {
    const mappedData = await Newfile.find(); // Fetch all records

    if (!mappedData || mappedData.length === 0) {
      return res.status(404).json({ message: "No mapped data found" });
    }

    res.status(200).json(mappedData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mapped data", error });
  }
};

exports.getMappedDataByQtestId = async (req, res) => {
  try {
    const { qtestId } = req.params;
    const mappedData = await Newfile.findOne({ qtestId });

    if (!mappedData) {
      return res.status(404).json({ message: "No record found for the given qtestId" });
    }

    res.status(200).json(mappedData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};
