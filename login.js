const express = require('express');
const router = express.Router();

// Login route with age validation
router.post('/login', (req, res) => {
    const { birthDate } = req.body;
    
    // Check if birthDate is provided
    if (!birthDate) {
        return res.status(400).json({ error: 'Birth date is required' });
    }

    // Validate date format
    const userBirthDate = new Date(birthDate);
    if (isNaN(userBirthDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Calculate age
    const age = calculateAge(userBirthDate);

    // Check if user is 19 or older
    if (age >= 19) {
        res.json({ message: 'Login successful!' });
    } else {
        res.status(403).json({ error: 'You must be at least 19 years old to login' });
    }
});

// Age calculation function
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = router;