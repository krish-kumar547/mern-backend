const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const Admin = require('./model/Admin');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName:"dbverse"
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes (example)
app.get('/', (req, res) => {
  res.send('API is working');
});


// import {protect,isAdmin }from'..?src/pages/authmiddleware.js';

//dummy user data (for demonstration purposes)

// (async () => {
//   const existing = await Admin.findOne({ email: "test@example.com" });
//   if (!existing) {
//     const hashed = await bcrypt.hash("123", 10);
//     await Admin.create({
//       username: "testadmin",
//       email: "test@example.com",
//       password: hashed,
//     });
//     console.log("✅ Admin user created");
//   }
// })();


// const admin=[
//   {
//     id:1,
//     username:"testadmin",
//     email:"test@example.com",
//     password: '$2b$10$y5IlsL/XVkJ1e.e7mq6riOsz992Lm4gBynJPGjPdCYlOkPdhbA8LS'     //hased "123"
//   }
// ];

// const plainpassword="123";
// bcrypt.hash(plainpassword,10)
// .then ((hashedpassword)=>{
//   console.log(hashedpassword)
// });


//secreat key for jwt (store the securely in real application)
const JWT_SECRET="AVCwerty837";

//API ROUTE FOR LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // find the admin in MongoDB
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    data: {
      user: { id: user._id, username: user.username, email: user.email },
    },
    token,
  });
});

// CHANGE PASSWORD API (for admin)
app.post("/change-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password changed successfully" });
});



const contactRoute= require('./Route/ContactRoute')

app.use('/',contactRoute);

const footerRoute= require('./Route/footerRoute')

app.use('/',footerRoute);

const categoryroute=require('./Route/CategoryRoute')
app.use('/', categoryroute)

const productroute=require('./Route/ProductRoute')
app.use('/',productroute)

const blogroute=require('./Route/BlogRoute')
app.use('/',blogroute)


const signuproute = require('./Route/SignupRoute');
app.use('/api', signuproute);

const orderroute=require('./Route/OrderRoute')
app.use('/',orderroute)

const dashroute=require('./Route/DashboardRoute')
app.use('/',dashroute)


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
