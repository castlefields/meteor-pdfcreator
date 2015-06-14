Meteor.methods({
	insertPDF:function(doc){
	console.log(doc)
	var fsFile = new FS.File(doc);
	fsFile.name('PDFKitExample.pdf');
    fsFile.extension('pdf');
	fsFile.contentType = "application/pdf";
	fsFile.encoding ='binary';

	PDFile.insert(fsFile,function(error,result){
	   	if(!error){
           console.log(result)
	   	}else{
	   	   console.log(error.message)
	   	}
	   });

	}
})