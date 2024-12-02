import mongoose from "mongoose";
const schema=mongoose.Schema

const categorySchema=new schema({
    name:{
        type:String,
        required:[true,"Category required"],
        unique:[true,"Category must be unique"],
        minlength:[3,'Too short category name'],
        maxlength:[32,'Too long category name']
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
const CategoryModel=mongoose.model('Category',categorySchema)
//export the model
export default CategoryModel;
