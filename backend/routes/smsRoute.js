const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User'); // Ensure this path points to your User model

// Driver triggered SMS Alert for a specific district
router.post('/send-alert', async (req, res) => {
  const { district } = req.body;

  try {
    // 1. Fetch all residents in the specified district with a registered phone number
    const residents = await User.find({
      district: district,
      role: 'resident',
      phone: { $exists: true, $ne: '' }
    });

    if (residents.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No registered residents found with phone numbers in ${district} district.`
      });
    }

    // 2. Format phone numbers and send SMS requests in parallel
    const smsPromises = residents.map((resident) => {
      let formattedPhone = resident.phone.trim();

      // Convert local Sri Lankan format (07XXXXXXXX) to international format (947XXXXXXXX)
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '94' + formattedPhone.slice(1);
      } else if (formattedPhone.startsWith('+94')) {
        formattedPhone = formattedPhone.slice(1);
      }

      return axios.get('https://app.notify.lk/api/v1/send', {
        params: {
          user_id: process.env.NOTIFY_USER_ID,
          api_key: process.env.NOTIFY_API_KEY,
          sender_id: process.env.NOTIFY_SENDER_ID,
          to: formattedPhone,
          message: `[CleanTrack] Garbage collection truck is arriving in ${district} district soon. Please keep your waste ready!`
        }
      });
    });

    // Wait for all SMS API calls to resolve
    await Promise.all(smsPromises);

    res.status(200).json({
      success: true,
      message: `SMS alerts successfully sent to ${residents.length} residents in ${district} district!`
    });

  } catch (error) {
    console.error('Notify.lk Error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data : error.message
    });
  }
});

module.exports = router;