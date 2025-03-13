// routes/email.js

// Example 1: Exporting a router (common for Express routes)
const express = require('express');
const router = express.Router();

// Define a route
router.post('/send', (req, res) => {
  // Your email sending logic here
  res.send('Email sent!');
});

module.exports = router; // ✅ Correct export

// ------------------------------------------

// Example 2: Exporting a function
const sendEmail = (to, subject, message) => {
  // Your email sending logic here
};

module.exports = sendEmail; // ✅ Correct export

// ------------------------------------------

// Example 3: Exporting an object
const emailService = {
  sendWelcomeEmail: (user) => {
    // Send welcome email logic
  },
  sendResetPasswordEmail: (user) => {
    // Send password reset email logic
  }
};

// module.exports = emailService; // ✅ Correct export
// Last line should be ONLY:
module.exports = router;