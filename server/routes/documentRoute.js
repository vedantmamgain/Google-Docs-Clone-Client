const express = require("express");
const router = express.Router();
const documentController = require("./../controller/documentController");

router.route("/").post(documentController.postDocu);

router
  .route("/:id")
  .get(documentController.getDocu)
  .put(documentController.updateDocu)
  .delete(documentController.deleteDocu);

module.exports = router;
