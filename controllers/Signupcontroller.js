const SignupModel=require("../model/Signupmodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");

const JWT_SECRET="AVCwerty837";

const signup = async(req ,res)=>{
  const { name, email, password } = req.body;
console.log(req.body)
  try {
    // Check if user already exists
    const userExists = await SignupModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await SignupModel.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
   
    };

    // USER LOGIN
const UserLogin= async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await SignupModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await SignupModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




    module.exports= {signup,UserLogin,changePassword}
