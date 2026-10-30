const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    courseInterest: { type: String, required: true, trim: true },
    
    claimedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null 
    },
    claimedByName: {
      type: String,
      default: null
    },
    claimedAt: { 
      type: Date, 
      default: null 
    },
  },
  { timestamps: true } 
);


enquirySchema.index({ claimedBy: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);