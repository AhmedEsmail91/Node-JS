let mode="dev"
export const globalError=(err,req, res,next) => {
    err.statusCode = err.statusCode || 500;
    // err.stack: show the error in details just for development not for production.
    if (mode==="prod") {
        res.status(err.statusCode).json({ error: err.message});
    }
    // descripe the error in details just for development not for production.
    else res.status(err.statusCode).json({ error: err.message,stack:err.stack });
  }; 