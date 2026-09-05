const express = require('express');

const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getMyResolvedComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/complaintController');

const {
  protect
} = require('../middleware/authMiddleware');


 
// Resident - Create complaint
// POST /api/complaints
 
router.post(
  '/',
  protect,
  createComplaint
);


 
// Resident - Get own complaints
// GET /api/complaints/my
 
router.get(
  '/my',
  protect,
  getMyComplaints
);


 
// Resident - Get own resolved complaints
// GET /api/complaints/resolved
 
router.get(
  '/resolved',
  protect,
  getMyResolvedComplaints
);


 
// Admin - Get all complaints
// GET /api/complaints
 
router.get(
  '/',
  protect,
  getAllComplaints
);

 
// Admin - Update complaint status
// PUT /api/complaints/:id/status
 
router.put(
  '/:id/status',
  protect,
  updateComplaintStatus
);


 
// Existing update route
// PUT /api/complaints/:id
 
router.put(
  '/:id',
  protect,
  updateComplaintStatus
);


module.exports = router;