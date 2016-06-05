
var log = console.log.bind(console);

describe("File System Directory", function() {
  var dirEntry = Fixtures.dirEntry;
  var fileSystem = new MockChromeFileSystem(dirEntry);

  var service = new FileSystemService(fileSystem); 

  describe("When given directory entry, returns entries", function() {
    results = null;
    beforeEach((done) => {
      service.getDirectoryEntries(dirEntry, (callbackResult)=>{
        results = callbackResult;
        done();
      });
    });
    it("Expect matching size", function() {
      expect(results.length).toEqual(dirEntry.entries.length);
    });
  });

  describe("Choose directory returns accurate model", function() {
    results = null;
    beforeEach((done) => {
      service.chooseDirectoryAsModel((callbackResult)=>{
        results = callbackResult;
        done();
      });
    });
    it("Expect matching size", function() {
      expect(results.length).toEqual(dirEntry.entries.length);
    });
  });


  describe("Interaction with jqTree", function() {

    var results  = null;

    beforeEach(function(done) {
      $('body').append('<div id="tree1"></div>');

      // When build model from file system Entries
      service.getTreeModel(dirEntry, function(callbackResults) {
        results = callbackResults;
        done();
      });
    });

    afterEach(function() {
      // Can comment this out to see the tree in the Jasmine Spec Runner
      var $tree = $('#tree1');
      $tree.tree('destroy');
      $tree.remove();
    });
    
    it("Given directory entry, returns jqTree root", function() {
        // When model sent to jqTree
        var $tree = $('#tree1');
        $tree.tree({data: results});
        var tree = $tree.tree("getTree");

        // Then
        expect(tree.children[0].name).toEqual(Fixtures.textDir.name);
        expect(tree.children[0].children[0].name).toEqual(Fixtures.text1.name);
        expect(tree.children[0].children[0].textContent).toEqual(Fixtures.text1.content);
        expect(tree.children[0].children[1].name).toEqual(Fixtures.text2.name);
        expect(tree.children[0].children[1].textContent).toEqual(Fixtures.text2.content);

        expect(tree.children[1].name).toEqual(Fixtures.researchDir.name);
        expect(tree.children[1].children[0].name).toEqual(Fixtures.research1.name);
        expect(tree.children[1].children[0].textContent).toEqual(Fixtures.research1.content);
        expect(tree.children[1].children[1].name).toEqual(Fixtures.research2.name);
        expect(tree.children[1].children[1].textContent).toEqual(Fixtures.research2.content);
    });
  });

  describe("Opening files", function() {
    var results = null;
    
    describe("Read contents of File Entry", function() {
      beforeEach((done) => {
        results = null;
        service.readFileEntry(Fixtures.text1, (callbackResult)=>{
          results = callbackResult;
          done();
        });
      });

      it("Expect matching contents", ()=>{
        expect(results).toEqual(Fixtures.text1.content);
      });
    });


    describe("Read contents of path", function() {
      beforeEach((done) => {
        results = null;
        service.readFile("Research/Research2", (callbackResult)=>{
          results = callbackResult;
          done();
        });
      });
      
      it("Expect matching contents", ()=>{
        expect(results).toEqual(Fixtures.research2.content);
      });
    });


    describe("No file found", function() {
      beforeEach((done) => {
        service.readFile("Research/I/no/exist", (callbackResult)=>{
          results = callbackResult;
          done();
        }, (error) => {
          results = error.message;
          done();
        });
      });
      
      it("Expect error message", ()=>{
        expect(results).toEqual("No file found for: Research/I/no/exist");
      });
    });

  });

});
