import mongoose from "mongoose";
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    title: {
      type: String,
      required: [true, "product required"],
      unique: [true, "product must be unique"],
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    coverImage: {
      type: String,
      required: [true, "product image cover image required"],
    },
    image: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must be belong to category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Too short rating must be greater than or equal to 1"],
      max: [5, "Too long rating must be less than or equal to 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
productSchema.pre(/^find/,function(next){
  this.populate({
    path: 'category',
    select: 'name -_id',
  })
  next();
})
const ProductModel = mongoose.model('Product', productSchema);
//export the model
export default ProductModel;
