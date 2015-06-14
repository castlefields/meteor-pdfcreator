Template.home.events({
	'click #generatePDF':function(e,t){
	e.preventDefault();
    var instance = Template.instance(),
    name = instance.$('#name').val(),
    life = instance.$('#life').val(),
    choice = instance.$('#choice').val();
    var doc = new jsPDF();
	doc.setFontSize(40);
	doc.text(35, 25, choice);
	var string = doc.output('datauristring');
	var fsFile = new FS.File(string);
	fsFile.name(name+'.pdf');
	fsFile.contentType = "application/pdf";
	fsFile.encoding ='binary';
    PDFile.insert(fsFile,function(error,result){
	   	if(!error){
           console.log(result._id)
           Router.go('/seePDF/'+result._id)
	   	}else{
	   	   console.log(error.message)
	   	}
	   });
	}
})