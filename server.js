const express = require('express');
const app = express();

// server.js
const emailRouter = require('./routes/email');
const phoneRouter = require('./routes/Phone');

app.use('/api/email', emailRouter);
app.use('/api/Phone', phoneRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});