PDF = new Mongo.Collection(null);
PDFile = new FS.Collection('PDFile',{
  stores:[new FS.Store.FileSystem('PDFile')]
})

if(Meteor.isClient){
    Meteor.subscribe('PDFile');
}

Router.route('/', function () {
  this.render('home');
});

Router.route('/getPDF', function() {
 var doc = new PDFDocument({size: 'A4', margin: 50});
 doc.fontSize(12);
 doc.text(ServerSession.get('hi'), 10, 30, {align: 'center', width: 200});
 this.response.writeHead(200, {
 'Content-type': 'application/pdf',
 'Content-Disposition': "attachment; filename=test.pdf"
 });
 this.response.end( PDFile );
 }, {where: 'server'});

Router.route('/seePDF/:id',{
  waitOn:function(){
   Meteor.subscribe('PDFileId');
  },
  action:function(){
   Session.set('pdfId',this.params.id)
   this.render('seePDF')
  }
})