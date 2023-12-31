import mongoose, { Mongoose, Schema,} from "mongoose";

const userSchema = new Schema;({
    name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     number:{
        type:Number,
        required:true
     },
     role:{
        type:String,
        enum:["Buyer","Seller","Admin"],
        default:"Buyer"
     },
     cart:{
        type:String
     },
     wishlist:{
        type:String
     }
})
export default Mongoose.model("User","newSchema")