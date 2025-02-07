const Mapping = require("../models/Mapping");
const Valuefile = require("../models/almModel");
const MappedResult = require("../models/MappedResult");

const mapAndStoreValues = async (req, res) => {
  try {
    const mappings = await Mapping.find();
    const valuefiles = await Valuefile.find();
    
    let mappedResults = [];

    mappings.forEach(mapping => {
      valuefiles.forEach(valuefile => {
        valuefile.entities.forEach(entity => {
          entity.Fields.forEach(field => {
            if (mapping.almName === field.Name) {
              field.values.forEach(val => {
                mappedResults.push({
                  almName: mapping.almName,
                  value: val.value
                });
              });
            }
          });
        });
      });
    });

    await MappedResult.insertMany(mappedResults);
    res.status(201).json({ message: "Mapping and values stored successfully", data: mappedResults });
  } catch (error) {
    res.status(500).json({ message: "Error mapping values", error });
  }
};

module.exports = { mapAndStoreValues };
