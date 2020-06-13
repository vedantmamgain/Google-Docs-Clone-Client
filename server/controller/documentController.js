const docu = require("./../models/docuModel");

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

exports.updateDocu = async (req, res) => {
  try {
    const document = await docu.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // this sends the modified document back rather than true
      runValidators: true,
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
