var log = console.log.bind(console);

describe("FileTree", function() {
  var fileSystem = new MockChromeFileSystem(Fixtures.dirEntry);
  var service = new FileSystemService(fileSystem); 
  var fileTree = new FileTree(service, new FileTreeController());

  describe("Model manipulation", function() {
    it("Get element from model", function() {
      
    });

  });

});