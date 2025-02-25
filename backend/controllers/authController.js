//authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Authentication = require("../models/Authentication");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await Authentication.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = new Authentication({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.MONGO_URI,
      { expiresIn: "30d" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Received Login Request:", req.body); // ✅ Debugging ke liye
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email , role and Password are required." });
  }

  const validRoles = ["vendor", "user", "admin"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role selected." });
  }

  try {
    const user = await Authentication.findOne({ email });

    if (!user || user.role !== role) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // if (user.role !== role) {
    //   return res.status(400).json({ message: 'Invalid role selection.' });
    // }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.MONGO_URI,
      { expiresIn: "30d" }
    );
   // const token = generateToken(user._id); // Generate JWT

    // res.json({
    //   success: true,
    //   user: {
    //     _id: user._id,
    //     role: user.role,
    //     vendorId: user.vendorId || null, // ✅ Ensure vendorId is sent
    //   },
    //   token
    // });

    res
      .status(200)
      .json({
        message: "Login successful",
        userId: user._id,
        role: user.role,
        token: token,
      });

   // ✅ Response data me vendorId add karo
   const responseData = {
    message: 'Login successfully',
    userId: user._id.toString(),
    role: user.role,
    token: token
  };

  if (user.role === "vendor") {
    responseData.vendorId = user._id.toString(); // ✅ Vendor ID send karo
  }

  console.log("Response Data:", responseData); // ✅ Debugging ke liye

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
