import mongoose from "mongoose";
const schema=mongoose.Schema

const subCategorySchema=new schema({
    name:{
        type:String,
        required:[true,"Category required"],
        unique:[true,"Category must be unique"],
        minlength:[3,'Too short category name'],
        maxlength:[32,'Too long category name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,"subCategory must be belong to parent category"],
    }
  
},
{
    timestamps:true
})
const SubCategoryModel=mongoose.model('SubCategory',subCategorySchema)
//export the model
export default SubCategoryModel;
