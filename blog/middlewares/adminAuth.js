function adminAuth(req,res,next){
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect("/login");
    }
}
//O next serve para dar continuidade na requicão.

module.exports = adminAuth;