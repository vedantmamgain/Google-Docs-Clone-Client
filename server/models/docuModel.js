//Using mongoose orm for creating schemas for our document
const mongoose = require("mongoose");

const docuSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Provide the document name"] },
  content: { type: String, default: "" },
  editableProperty: {
    type: Boolean, //this property is used to toggle whether we want the document to be edited or not tiptapVuetify has a option we can provide to toggle that property
    required: [true, "Provide the document editable property"],
    default: true,
  },
  lastEdited: { type: Date, default: Date.now }, //to save the last edited property in a document
});

const docu = mongoose.model("documents", docuSchema);

module.exports = docu;
