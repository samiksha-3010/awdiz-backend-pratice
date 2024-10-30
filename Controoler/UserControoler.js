
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModal from '../MODAL/UserModal.js';

export const Register = async (req, res) => {
    try {
      // const { userData } = req.body;
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role)
        return res.json({
          success: false,
          message: "All Feilds are Mandatory!",
        });
  
      const isEmailExist = await UserModal.find({ email: email });
      if (isEmailExist.length) {
        return res.json({
          success: false,
          message: "Email already exists! Try a new one.",
        });
      }
  
      const hashPassW = await bcrypt.hash(password, 10);
  
      const user = new UserModal({
        name:name,
        email:email,
        password: hashPassW,
        role:role,
      });
  
      await user.save();
      return res.json({
        success: true,
        message: "User Registered Successfully!",
        user:user
      });
    } catch (error) {
      return res.json({ success: false, message: error.message});
    }
  };
  export const  Login = async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.json({
            success: false,
            message: "All feilds are mandatory!",
          });
    
        const user = await UserModal.findOne({ email:email });
        if (!user) return res.json({ success: false, message: "User not found!" });
    
        if (user.isBlocked) {
          return res.json({
            success: false,
            message: "You are Blocked!Contact us.",
          });
        }
    
        const isPasswordRight = await bcrypt.compare(password, user.password);
        // console.log(isPasswordRight, "isPasswordRight");
        if (isPasswordRight) {
          const userObj = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
          };
    
          // console.log(token, "token here");\
          // console.log(expiryTime, "expiryTime")
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET
          );
    
          return res.json({
            success: true,
            message: "Login Successfull",
            user: userObj,
            token: token,
          });
        }
        return res.json({ success: false, message: "Password is Wrong!" });
      } catch (error) {
        return res.json({ success: false, message: false });
      }
    };
    
export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.json({ success: false, message: "Token is required!" })

        const decoededData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoededData, "decoededData")
        if (!decoededData) {
            return res.json({ success: false, message: "Not valid json token.." })
        }
        // return res.send(decoededData)
        const userId = decoededData?.userId

        const user = await UserModal.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id
        }

        return res.json({ success: true, user: userObeject })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

