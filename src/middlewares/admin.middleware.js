const adminOnly = (req,res, next) =>{
    if(!req.user){
        return res.status(401).json({
            message: "Authntication required"
        })
    }

    if(req.user.role !== "admin"){
        return res.status(403).json({
            message:"Access denaied, Admin privilages required"
        })
    }

    next()
}


module.exports = adminOnly