 import mongoose,{Schema} from "mongoose";

 const productSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    image:{
        type:String,
        required:true

    },
    cetegoary:{
        type:String,
        required:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    rating:{
        type:[number],
        enum:[0,0.1,]
    },
    comments:{
        type:[Objects] // "samiksha":product: "Good Product"
    }

 })
 export default mongoose.modal("Product",productSchema)