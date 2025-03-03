



// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const almRoutes = require("./routes/almRoutes");
const qtestRoutes = require("./routes/qtestRoutes");
const almfieldsRoutes = require('./routes/almfieldsRoutes');
const qtestfieldsRoutes = require('./routes/qtestfieldsRoutes');
// const mappingRoutes = require('./routes/mappingRoutes');
const valuefileRoutes = require('./routes/valuefileRoutes');
const newfileRoutes = require('./routes/newfileRoutes') 
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/alm", almRoutes);
app.use("/api/qtest", qtestRoutes);
app.use('/api', almfieldsRoutes);
app.use('/api',qtestfieldsRoutes);
app.use("/api", valuefileRoutes);
// app.use("/api/mappings", mappingRoutes);

app.use('/api/new', newfileRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
