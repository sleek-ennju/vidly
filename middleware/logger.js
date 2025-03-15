const log = (req, res, next)=>{
    console.log(`A request for a ${req.method} method has been called`);
    next();
};

module.exports = log;