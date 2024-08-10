// Global handling error middleware has 4 parameters (error, req, res, next) [last middleware in the chain]
export function catchError(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(
            (err) => { 
                // next() عصفوره
                next(err); // this will pass the error to the last middleware العمده الاخيره
                
            }
        );
    }
}