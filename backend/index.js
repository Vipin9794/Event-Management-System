const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const Admin =  require("./routes/adminRoutes");
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require("./routes/vendorRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Example routes
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/vendor", require("./routes/vendorRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
 app.use("/api/vendors" , vendorRoutes)
 //app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin",Admin);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
