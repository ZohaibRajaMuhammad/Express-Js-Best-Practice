const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
// If file is Phone.js
// const phoneRouter = require('./routes/Phone');  // Capital P// server.js
const phoneRouter = require('./routes/Phone'); // lowercase 'p'

// Middleware to validate and format phone number
const processPhone = (req, res, next) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });
    
    // Clean the phone number (remove all non-digits)
    const cleaned = phone.replace(/\D/g, '');
    
    // Validate phone number format
    let formattedPhone;
    if (cleaned.startsWith('91') && cleaned.length === 12) {
        // International format: +91-XXXXX-XXXXX
        formattedPhone = `+91-${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.startsWith('03') && cleaned.length === 10) {
        // Local format: 03-XXXX-XXXX
        formattedPhone = `03-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else {
        return res.status(400).json({ 
            error: 'Invalid format. Must start with +91 (12 digits) or 03 (10 digits)'
        });
    }

    req.formattedPhone = formattedPhone;
    next();
};

// Middleware to check duplicate phones
const checkDuplicatePhone = async (req, res, next) => {
    try {
        const data = await fs.readFile('phones.txt', 'utf8');
        const phones = data.split('\n').map(p => p.trim()).filter(p => p);
        if (phones.includes(req.formattedPhone)) {
            return res.status(409).json({ error: 'Phone number already exists' });
        }
        next();
    } catch (err) {
        if (err.code === 'ENOENT') next(); // File doesn't exist yet
        else res.status(500).json({ error: 'Server error' });
    }
};

// Save phone endpoint
router.post('/phone', 
    express.json(),
    processPhone,
    checkDuplicatePhone,
    async (req, res) => {
        try {
            await fs.appendFile('phones.txt', req.formattedPhone + '\n');
            res.json({ message: 'Phone number saved successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error saving phone number' });
        }
    }
);

module.exports = router;  // ✅ Correct export (remove the placeholder export)

