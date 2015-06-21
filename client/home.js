Template.home.events({
	'click #generatePDF':function(e,t){
	e.preventDefault();
	var can = document.getElementById('canvas');
	var context = can.getContext('2d');
	context.strokeStyle = 'black';
    context.strokeRect(0,0,250,200);
	var img = new Image();
	img.src = can.toDataURL();

    var instance = Template.instance(),
    name = instance.$('#name').val(),
    life = instance.$('#life').val(),
    choice = instance.$('#choice').val();
    var doc = new jsPDF();
	doc.setFontSize(10);
	doc.setLineWidth(1);
	doc.text(10, 30, choice);
	doc.line(10, 35, 200, 35);
	doc.text(90, 39, "SERVICE REPORT");
	doc.line(10, 40.5, 200, 40.5);
	doc.setLineWidth(0.1);	
	doc.line(10, 40.5, 10, 82);
	doc.line(200, 40.5, 200, 82);
	doc.text(15, 45, "Company:"+name);
	doc.text(15, 50, "Adress:"+life);
	doc.text(15, 55, "Phone no:"+choice);
	doc.text(15, 60, "Fax no:");
	doc.text(15, 65, "Service tec:");
	doc.text(110, 45, "Date:");
	doc.text(110, 50, "Service callen in:");
	doc.text(110, 55, "Contact:");
	doc.text(110, 60, "Po. No:");
	doc.text(110, 65, "Courtesy Service:");
	doc.text(110, 70, "Start Time:");
	doc.text(110, 75, "End Time:");
	doc.text(110, 80, "Total Time:");
	doc.setLineWidth(1);
	doc.line(10, 82, 200, 82);
	doc.text(10, 86, "Nature of problem:");
	doc.line(10, 88, 200, 88);
	doc.text(10, 95, "(1)Printer:");
	doc.text(10, 100, "Model:");
	doc.text(10, 105, "s/n:");
	doc.text(10, 110, "Location:");
	//doc.text(10, 25, choice);
	//doc.text(55, 25, choice);
	doc.text(160, 255, "Firmilla:");
	doc.addImage(img, 'JPEG', 175, 250, 25, 20);
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
});

Template.home.onRendered(function(){
function MultiTouchDraw(canvas) {
	this.canvas = canvas;
	canvas.width = 250;
	canvas.height = 200;

	this.context = canvas.getContext("2d");
	this.context.lineCap = "round";
	this.context.lineWidth = 6;

	this.ballpoints = {};
	this.counter = 0;

	canvas.addEventListener("mousedown", (function (e) {
		this.onDrawStart(e);
		canvas.onmousemove = this.onDraw.bind(this);
	}).bind(this));

	canvas.addEventListener("mouseup", (function (e) {
		this.onDrawEnd(e);
		canvas.onmousemove = null;
	}).bind(this));

	canvas.addEventListener("touchstart", (function (e) {
		e.preventDefault();
		for (var i = 0; i < e.changedTouches.length; i++) {
			this.onDrawStart(e.changedTouches[i]);
		}
	}).bind(this));

	canvas.addEventListener("touchmove", (function (e) {
		e.preventDefault();
		for (var i = 0; i < e.changedTouches.length; i++) {
			this.onDraw(e.changedTouches[i]);
		}
	}).bind(this));

	canvas.addEventListener("touchend", (function (e) {
		e.preventDefault();
		for (var i = 0; i < e.changedTouches.length; i++) {
			this.onDrawEnd(e.changedTouches[i]);
		}
	}).bind(this));
}

/*MultiTouchDraw.randomPastel = function () {
	var r = Math.floor(Math.random() * 4 + 1) * 64,
		g = Math.floor(Math.random() * 4 + 1) * 64,
		b = Math.floor(Math.random() * 4 + 1) * 64;
	return "rgb(" + r + ", " + g + ", " + b + ")";
};*/

MultiTouchDraw.prototype = {
	onDrawStart: function (e) {
		var ballpoint = {
			x: e.pageX - this.canvas.offsetLeft,
			y: e.pageY - this.canvas.offsetTop,
			color:"rgb(0,0,0)"/* MultiTouchDraw.randomPastel()*/
		};
		this.ballpoints[e.identifier || ++this.counter] = ballpoint;
		this.drawLine(ballpoint.x - 1, ballpoint.y, ballpoint.x, ballpoint.y, ballpoint.color);
	},

	onDraw: function (e) {
		var ballpoint = this.ballpoints[e.identifier || this.counter],
			x = e.pageX - this.canvas.offsetLeft,
			y = e.pageY - this.canvas.offsetTop;
		this.drawLine(ballpoint.x, ballpoint.y, x, y, ballpoint.color);
		ballpoint.x = x;
		ballpoint.y = y;
	},

	onDrawEnd: function (e) {
		delete this.ballpoints[e.identifier || this.counter];
	},

	drawLine: function (x0, y0, x1, y1, color) {
		this.context.strokeStyle = color;
		this.context.beginPath();
		this.context.moveTo(x0, y0);
		this.context.lineTo(x1, y1);
		this.context.stroke();
	}
};
new MultiTouchDraw(document.getElementById("canvas"));
})