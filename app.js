import express from "express";
import dotenv from"dotenv"
import morgan from "morgan";
import cors from "cors";
//app.set("view engine", "ejs");
//app.use(express.urlencoded({ extended: true }));
// set env
dotenv.config({path:'config.env'})
import dbConnection from './config/DataBase.js';
import categoryRoute from './API/categoryRoute.js';
import subCategoryRoute from './API/subCategoryRoute.js';
import ApiError from "./utils/apiError.js";
import globalError from "./middleware/errorMiddleWare.js";
// connect with DB
dbConnection();

//express app
const app = express();
// middlewares
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// mount route
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);

// Serve the front.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'front.html'));
});

app.all('*',(req,res,next)=>{
  next(new ApiError(`cannot find this route ${req.originalUrl}`,400 ))
})
// global error handling middleware
app.use(globalError)

const PORT=process.env.PORT;

  const server=app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });

process.on('unhandledRejection',(err)=>{
  console.error(`unhandledRejection error: ${err.name} | ${err.message}`)
  server.close(()=>{
    console.error('shuttingg down..')
    process.exit(1)
  })
})