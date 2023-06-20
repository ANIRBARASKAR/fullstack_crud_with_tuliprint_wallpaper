const monngoose = require("mongoose");

module.exports = monngoose.model(
  "Material",
  monngoose.Schema(
    {
      materialTitle: {
        type: String,
      },
      materialAvtar: {
        type: String,
      },
      materialDesc: {
        type: String,
      },
    },
    { timestamps: true }
  )
);
