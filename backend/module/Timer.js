const mongoose = require("mongoose");

const { Schema } = mongoose;

const TimerSchema = new Schema({
  emp: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
  },
  duration: {
    hours: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
    seconds: {
      type: String,
    },
  },
  location: {
    type: String,
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
  },
});

module.exports = mongoose.model("time", TimerSchema);
