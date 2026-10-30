const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    courseInterest: { type: String, required: true, trim: true },
    
    // If null, it's public. If populated with a User ID, it becomes private.
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
  { timestamps: true } // This automatically creates 'createdAt' (askedAt) and 'updatedAt'
);

// Index to speed up queries for unclaimed leads and user-specific leads
enquirySchema.index({ claimedBy: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);