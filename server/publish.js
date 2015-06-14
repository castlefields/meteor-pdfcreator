Meteor.publish('PDFile',function(){
	return PDFile.find();
})

Meteor.publish('PDFileId',function(id){
	return PDFile.find({'_id':id});
})