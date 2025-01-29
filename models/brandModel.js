import mongoose from "mongoose";
const schema=mongoose.Schema

const brandSchema=new schema({
    name:{
        type:String,
        required:[true,"Brand required"],
        unique:[true,"Brand must be unique"],
        minlength:[3,'Too short Brand name'],
        maxlength:[32,'Too long Brand name']
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String
},
{
    timestamps:true
})
const BrandModel=mongoose.model('Brand',brandSchema)
//export the model
export default BrandModel;
