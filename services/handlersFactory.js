import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

 export const deleteOne= (Model) =>
    asyncHandler(async (req, res,next) => {
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);
        if (!document) {
          return next(new ApiError(`no document for this Model ${id}`,404))
          // or use " throw new ApiError(`No category found for ID: ${id}`, 404);" >> instead of next
        }
        res.status(204).send();
      });
      
export const updateOne= (Model) =>
    asyncHandler(async (req, res,next) => {
        const document = await Model.findByIdAndUpdate(
         req.params.id,
         req.body,
          { new: true }
        );
        if (!document) {
          return next(new ApiError(`no document for this id ${req.params.id}`,404))
        }
        res.status(200).json({ data: document });
      }); 
export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  })

export const getOne = (Model) =>
  asyncHandler(async (req, res,next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new ApiError(`no document for this id ${req.params.id}`,404))
    }
    res.status(200).json({ data: document });
  }); 

export const getAll = (Model,modelName='') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if(req.filterObj){
      filter = req.filterObj;
    }
    //build query
  const totalDocuments = await Model.countDocuments();
  const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .selectFields()
    .search(modelName)
    .paginate(totalDocuments);

  const {mongooseQuery , paginationResult} = apiFeatures;
  const documents = await mongooseQuery;
  res.status(200).json({
    results: documents.length,
    paginationResult,
    data: documents,
  });
});
