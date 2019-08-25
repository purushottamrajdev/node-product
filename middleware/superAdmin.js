module.exports=function(req,res,next){
    //401-unathorized
    //403-forbidden
    if(!req.user.isSuperAdmin)
        return res.status(403).send('Access Denied..');
    next();
}