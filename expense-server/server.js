require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const rbacRoutes=require('./src/routes/rbacRoutes');
const profileRoutes=require('./src/routes/profileRoutes');
const paymentRoutes=require('./src/routes/paymentRoutes');

mongoose.connect(process.env.MONGO_DB_CONNECTION_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log('Error Connecting to Database: ', error));

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true
};

const app = express();

app.use(cors(corsOption));

// Skip applying express.json() middleware to
// requests that starts with /payments/webhook.
app.use((request, next, response)=>{
    if(request.originalUrl.startsWith('/payments/webhook')){
        console.log('Webhook request, skipping json middleware');
        next();
    }
    express.json()(request, next, response);
});

app.use(express.json()); // Middleware
app.use(cookieParser()); // Middleware

app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/users', rbacRoutes);
app.use('/payments', paymentRoutes);
app.use('/profile', profileRoutes);

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});