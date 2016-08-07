var express=require('express');
module.exports=function(app){
	var photos=require('./controller/photos_controller');
	var comment=require('./controller/comment_controller');
	var pages=require('./controller/pages_controller');
	app.use('./static',express.static('./static')).use('/images',express.statci('./images')).use('/lib',express.static('./lib'));
	app.get('/',function(req,res){
		res.render('photos');
	});
	app.get('/photos',photos.getPhotos);
	app.get('/photo',photos.getPhoto);
	app.get('/page',pages.getPage);
	app.get('/comments/get',comments.getComment);
	app.post('/comments/add',comments.getaddComment);
}