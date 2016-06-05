var log = console.log.bind(console);

describe("FileTree", function() {
  var fileSystem = new MockChromeFileSystem(Fixtures.dirEntry);
  var service = new FileSystemService(fileSystem); 
  var fileTree = new FileTree(service, new FileTreeController());

  beforeEach(function(done) {
    service.getTreeModel(Fixtures.dirEntry, function(callbackResults) {
      fileTree.currentModel_ = callbackResults;
      done();
    });
  });

  describe("Model manipulation", function() {
    it("Get element from model", function() {
      var e = FileTree.getElement_(fileTree.currentModel_, "research2");
      expect(e.name).toEqual(Fixtures.research2.name);
      expect(e.textContent).toEqual(Fixtures.research2.content);
    });

  });

});