// // server.js
// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const dataRoutes = require('./routes/dataRoutes')
// const {errorHandler} = require('./middleware/errorMiddleware')
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use("/api",dataRoutes);

// //error handling middleware
// app.use(errorHandler);

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const almRoutes = require("./routes/almRoutes");
const qtestRoutes = require("./routes/qtestRoutes");
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


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
