var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: { type: String },
  location: {
    lat: { type: String },
    lon: { type: String }
  },
  image: { type: String }, // URL
  createdBy: {
    userId: { type: String },
    date: { type: Number } // Unix time
  },
  pledges: [{
    userId: { type: String },
    amount: { type: Number },
    date: { type: Number }
  }],
  claimedBy: {
    userId: { type: String },
    date: { type: String }
  },
  verifiedBy: [{
    userId: { type: String },
    image: { type: String }, // URL to image
    date: { type: Number } // Date verified
  }],
  tags: { type: Array }
});

module.exports = mongoose.model('Item', itemSchema);
