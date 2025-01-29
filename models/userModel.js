import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetExpire:Date,
    passwordResetVerified:Boolean,
    role:{
        type:String,
        enum:['user','admin','manager'],
        default:'user',
    },
    active:{
        type:Boolean,
        default:true
    }

},
    {timestamps:true}
)

userSchema.pre('save', async function(next){
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    // hash the user password
    this.password = await bcrypt.hash(this.password, 12);
    next();

})
const UserModel=mongoose.model('User',userSchema)
export default UserModel