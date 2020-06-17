//Importing the document model which contains the schema of the document to be made
const docu = require("./../models/docuModel");

//All of the functions for the CRUD operations here

//In getDocu we are finding the document by Id if found send the found document as the response else send a 404 with failure message
exports.getDocu = async (req, res) => {
  try {
    const document = await docu.findById(req.params.id);

    if (!document) {
      res.status(404).json({
        result: "Failure",
        message: "No Document of that name found",
      });
    }

    res.status(200).json({
      result: "Sucess",
      data: {
        document,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//Saving our document during document creation time.
exports.postDocu = async (req, res) => {
  try {
    const document = await docu.create(req.body);
    console.log(document);
    res.status(201).json({
      status: "sucess",
      document,
    });
  } catch (err) {
    console.log(err);
  }
};

//Updating our document on the fly. Saving and updating will be merged into later commits
exports.updateDocu = async (req, res) => {
  try {
    const document = await docu.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // this sends the modified document back rather than true
      runValidators: true, //This runs all the validators if any
    });

    res.status(200).json({
      result: "Sucess",
      data: {
        document,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//Deleting the document with findByIdAndDelete
exports.deleteDocu = async (req, res) => {
  try {
    const document = await docu.findByIdAndDelete(req.params.id);
    res.status(200).json({
      result: "Sucess",
    });
  } catch (err) {
    console.log(err);
  }
};
