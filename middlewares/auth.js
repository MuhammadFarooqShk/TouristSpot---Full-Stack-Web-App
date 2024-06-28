module.exports = async function(req,res,next){
  if(!req.session.user) req.session.user=null;

  res.locals.user=req.session.user;
  next();
}