const Enquiry = require('../models/enquiry.model');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose'); 
const User = require('../models/user.model');

// 1. Public form submission (No auth required)
exports.createEnquiry = async ({ name, phone, courseInterest }) => {
  if (!name || !phone || !courseInterest) {
    throw new AppError('name, phone and courseInterest are required', 400);
  }

  const enquiry = await Enquiry.create({
    name,
    phone,
    courseInterest,
  });

  return enquiry;
};

// 2. Fetch unclaimed leads (Public Pool)
exports.getPublicEnquiries = async () => {
  return await Enquiry.find({ claimedBy: null }).sort({ createdAt: -1 });
};

// 3. Fetch leads claimed by the logged-in user
exports.getMyEnquiries = async (userId) => {
  return await Enquiry.find({ claimedBy: userId }).sort({ claimedAt: -1 });
};


exports.claimEnquiry = async (enquiryId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
    throw new AppError('Invalid enquiry ID format', 400);
  }

  // 1. Fetch the user so we have their name
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  // 2. Enforce Daily Limit
  const DAILY_LIMIT = 8;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const claimedTodayCount = await Enquiry.countDocuments({
    claimedBy: userId,
    claimedAt: { $gte: startOfDay },
  });

  if (claimedTodayCount >= DAILY_LIMIT) {
    throw new AppError(`Daily claim limit of ${DAILY_LIMIT} reached`, 429);
  }

  // 3. Atomic Update with Name included
  const claimedEnquiry = await Enquiry.findOneAndUpdate(
    { 
      _id: enquiryId, 
      claimedBy: null 
    },
    { 
      $set: { 
        claimedBy: userId, 
        claimedByName: user.name, // Save the name here
        claimedAt: new Date() 
      } 
    },
    { 
      new: true 
    }
  );

  if (!claimedEnquiry) {
    const exists = await Enquiry.findById(enquiryId);
    if (!exists) throw new AppError('Enquiry not found', 404);
    throw new AppError('Enquiry has already been claimed by another counselor', 409);
  }

  return claimedEnquiry;
};