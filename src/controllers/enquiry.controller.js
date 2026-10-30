const enquiryService = require('../services/enquiry.service');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

// Public: Anyone can submit an enquiry
exports.submitEnquiry = asyncHandler(async (req, res) => {
   const enquiry = await enquiryService.createEnquiry(req.body);
   res.status(201).json({ success: true, data: enquiry });
});

// Protected: Counselors/Admins see all unclaimed leads
exports.getPublicEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await enquiryService.getPublicEnquiries();
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// Protected: Counselors see leads they have claimed
exports.getMyEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await enquiryService.getMyEnquiries(req.user.userId);
  res.json({ success: true, count: enquiries.length, data: enquiries });
});


exports.claimEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.claimEnquiry(req.params.id, req.user.userId);
  res.json({ 
    success: true, 
    message: 'Enquiry claimed successfully', 
    data: enquiry 
  });
});