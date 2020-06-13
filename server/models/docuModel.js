const mongoose = require("mongoose");

const docuSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Provide the document name"] },
  content: { type: String, default: "" },
  editableProperty: {
    type: Boolean,
    required: [true, "Provide the document editable property"],
    default: true,
  },
  lastEdited: { type: Date, default: Date.now },
});

const docu = mongoose.model("documents", docuSchema);

module.exports = docu;
