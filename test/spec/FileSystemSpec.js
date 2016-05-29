var log = console.log.bind(console);

describe("File System Directory", function() {

  // Build test file system data
  var text1 = new MockFileEntry("text1", text1_content);
  var text2 = new MockFileEntry("text2", text2_content);
  var texts = [text1, text2];
  var textDir = new MockDirectoryEntry("Text", texts);
  var research1 = new MockFileEntry("research1", research1_content);
  var research2 = new MockFileEntry("research2", research2_content);
  var researches = [research1, research2];
  var researchDir = new MockDirectoryEntry("Research", researches);
  var entries = [textDir, researchDir];
  var dirEntry = new MockDirectoryEntry("root", entries);

  var fileSystem = new MockChromeFileSystem(dirEntry);

  var service = new FileSystemService(fileSystem); 

  it("When given directory entry, returns entries", function() {
    service.getDirectoryEntries(dirEntry, function(results) {
      expect(results.length).toEqual(entries.length);
    });
  });

  it("Choose directory returns accurate model", function() {
    service.chooseDirectoryAsModel(function(results) {
      expect(results.length).toEqual(entries.length);
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
        
        // Then
        expect(results[0].name).toEqual(entries[0].name);
        expect(results[1].name).toEqual(entries[1].name);

        // And when model sent to jqTree
        var $tree = $('#tree1');
        $tree.tree({data: results});
        var tree = $tree.tree("getTree");

        // Then
        expect(tree.children[0].name).toEqual(textDir.name);
        expect(tree.children[0].children[0].name).toEqual(text1.name);
        expect(tree.children[0].children[0].textContent).toEqual(text1.content);
        expect(tree.children[0].children[1].name).toEqual(text2.name);
        expect(tree.children[0].children[1].textContent).toEqual(text2.content);

        expect(tree.children[1].name).toEqual(researchDir.name);
        expect(tree.children[1].children[0].name).toEqual(research1.name);
        expect(tree.children[1].children[0].textContent).toEqual(research1.content);
        expect(tree.children[1].children[1].name).toEqual(research2.name);
        expect(tree.children[1].children[1].textContent).toEqual(research2.content);
    });
  });

  describe("Opening files", function() {
    var results = null;
    
    describe("Read contents of File Entry", function() {
      beforeEach((done) => {
        results = null;
        service.readFileEntry(text1, (callbackResult)=>{
          results = callbackResult;
          done();
        });
      });

      it("Expect matching contents", ()=>{
        expect(results).toEqual(text1.content);
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
        expect(results).toEqual(research2.content);
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
