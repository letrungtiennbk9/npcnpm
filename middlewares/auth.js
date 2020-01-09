module.exports =  function (req, res, next) {
	if (!req.isAuthenticated()) {
		if(req.xhr){
			return res.status(401).send({error:true,message:'unAuthenticated'});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		next();
	}
}