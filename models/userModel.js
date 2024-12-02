import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema= new schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    slug:{
        type:String,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
    },
    phone:String,
    profileImg:String,
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'too short password']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    active:{
        type:Boolean,
        default:true
    }

},
    {timestamps:true}
)

const UserModel=mongoose.model('user',userSchema)
export default UserModel