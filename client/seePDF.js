Template.seePDF.helpers({
	seeIt:function(){
		return PDFile.findOne({_id:Session.get('pdfId')});
	}
})