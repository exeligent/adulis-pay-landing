var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubscribeSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("subscribe", SubscribeSchema);
