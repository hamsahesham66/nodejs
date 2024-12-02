const globalError=(err,req,res,next)=>{
    console.error(err.stack); // Log the error stack for debugging purposes
    err.statusCode=err.statusCode || 500
    err.status=err.status || 'error'
    if(process.env.NODE_ENV==='development'){
        sendErrorForDev(err,res)
    }else{
        sendErrorForProd(err,res)
    }
  }


const sendErrorForDev=(err,res)=>{
    return   res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        // if you want to return the log error use > stack:err.stack
      })
  }

const sendErrorForProd=(err,res)=>{
    return   res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
      })
}
 export default globalError;