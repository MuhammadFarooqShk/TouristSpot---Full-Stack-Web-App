module.exports=async function(req,res,next){
    if(req.session.user) return res.redirect("/home");
    else req.session.user=null;

    res.locals.user=req.session.user;
    next()
}