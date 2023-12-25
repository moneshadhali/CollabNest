const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const societySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    member_req: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Society", societySchema);
