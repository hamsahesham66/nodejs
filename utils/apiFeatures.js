class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((field) => delete queryObject[field]);

    // filteration using gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryStr));
    return this;

  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(" ");
      console.log('Sort by:', sortBy); // Debugging statement

      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    }else{
        this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }
  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }else{
        this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }
  search(modelName){
    if (this.queryString.keyword) {
        const search = this.queryString.keyword;
        let query = {}
        if(modelName === 'Products'){
         query.$or= [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }else{
            query=  { name: { $regex: search, $options: 'i' } }  ;
        }
       this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
  }
  paginate(countDocuments) {
    const page = this.queryString.page *1 || 1;
    const limit = this.queryString.limit *1 || 1000;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    const totalPages = Math.ceil(countDocuments / limit);
    this.paginationResult = {
        limit :limit,
        currentPage: page,
        totalPages: totalPages,
        totalResults: countDocuments,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page * limit < countDocuments ? page + 1 : null,
      };   
    return this;
  }
}
export default ApiFeatures;