const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const adminRoutes = require('./routes/admin.routes'); 
const enquiryRoutes = require('./routes/enquiry.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/enquiries', enquiryRoutes);


app.use(errorHandler);

module.exports = app;