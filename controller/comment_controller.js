var mongoose=require('mongoose'),
	CommentThread=mongoose.model('CommentThread'),
	Reply=mongoose.model('Reply');

exports.getComment=function (req,res) {
	CommentThread.findOne({_id:req.query.commentId}).exec(function(err,comment){
		if (!comment) {
			res.json(404,{msg:'CommentThread Not Found'});
		}else{
			res.json(comment);
		}
	})
	// body...
}

exports.addComment=function(req,res){
	CommentThread.findOne({_id:req.body.rootCommentId}).exec(function(err,CommentThread){
		if (!CommentThread) {
			res.json(404,{msg:'CommentThread Not Found.'});
		}else{
			var newComment=Reply(req.body.newComment);
			newComment.username=generateRandomUsername();
			addComment(req,res,commentThread,currentComment,req.body.parentCommentId,newComment);
		}
	});
};
function addComment(req,res,commentThread,currentComment,parentId,newComment){
	if (commentThread.id==parentId) {
		commentThread.replies.push(newComment);
		updateCommentThread(req,res,commentThread);
	}else{
		for(var i=0; i<currentComment.replies.length;i++){
			var c=currentComment.replies[i];
			if (c._id==parentId) {
				c.replies.push(newComment);
				var replyThread=commentThread.replies.toObject();
				updateCommentThread(req,res,commentThread);
				break;
			}else{
				addComment(req,res,commentThread,c,parentId,newComment);
			}
		}
	}
};

function updateCommentThread(req,res,commentThread) {
	CommentThread.update({_id:commentThread.id},{$set:{replies:commentThread.replies}})
	.exec(function(err,saveCommit){
		if (err) {
			res.json(404,{msg:'Faild to update CommentThread'});
		}else{
			res.json({msg:'success'});
		}
	});
}

function generateRandomUsername(){
	var users=['DaNae','Brad','Brendan','Caleb','Aedan','Taeg'];
	return users[Math.floor((Math.random()*5))];
}