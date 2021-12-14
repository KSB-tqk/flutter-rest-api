const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model('Image', imageSchema)