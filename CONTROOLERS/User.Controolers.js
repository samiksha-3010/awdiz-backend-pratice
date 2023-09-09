 import bcrypt from 'bcrypt'
 import jwt from 'jsonwebtoken'

 export  const Register = async(req,res)=>{
  try {
    const {userData} = req.body;
    const { name,email,password,number,role} = userData;
    if(!name || !email|| !password|| !number|| !role)
    return res.json({
   success:false,message:"All Fields Are Mandotary"
  })

  const isEmailExist = await UserModal.find({email:email})
  if(isEmailExist.length){
    return res.json({success:false,message:"Email Is Exits TRy Diffrent Email"})
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const user = new  UserModal({name,email,password,hashedPassword,role,number})
  await user.save();

  return res.json({success:true,message:"User Registeres Successfull..."})

    
  } catch (error) {
    return res.json({success: false, message: error.message})
 
    
  }
 }
 export const Login = async (req,res)=>{
  try {
    const {email,password} = req.body
    if(!email || !password)
    return res.json ({success:false,message:"All Fields Are Mandotory"})

    const  user = await UserModal.findone({email:email})
    if(!user)
    return res.json({success:false,message:"User Not Found"})
    if (user.isBlocked) {
      return res.json({
        success: false,
        message: "You are Blocked Contact us.",
      });
    }

    const  isPassworrdRight = await bcrypt.compare(password.user.password)
   if( isPassworrdRight){
    const userObject ={
      name:user.name,
      email:user.email,
      _id:user._id,
      role:user.role
    };
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
    return res.json({success:true,message:"Login Succesfull",user:"userObject",token:"token"})
   }
   return res.json ({success:false,message:"Password is not Match"})
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }

 }

 export const getCurrentUser = (req,res)=>{
try {
  const {token} = req.body
  if(!token){
    return res.status(404).json({success:false,message:"Token is Mandtory"})
  }
    const decodedData = jwt.verify(token.process.env.JWT_SECRET)
    if (! decodedData ){
      return res.status(404).json({success:false,message:"json Token is not valid"})
    }
    const userId = decodedData?.userId
    const user = new UserModal.findById(userId)
    if(!user){
      return res.status(404).json({success:false,message:"User Not Found"})
    }
    const userObject={
      name:user?.name,
      email:user?.email,
      _id:user?._id,
      role:user?.role
    }
    return res.status(200).json({success:true,user: userObject})
  
  
} catch (error) {
  return res.json({success:false,message:error.message})
  
}
}









