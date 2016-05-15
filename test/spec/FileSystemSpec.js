describe("File System Directory", function() {

  var entries = [new MockDirectoryEntry("text"), new MockDirectoryEntry("research")];
  var dirEntry = new MockDirectoryEntry("root", entries);

  fileSystem = new MockChromeFileSystem(dirEntry);

  var service = new FileSystemService(fileSystem); 

  beforeEach(function() {
    fileSystem.chosenFileEntry = {};
  });

  it("has chosenFileEntry", function() {
    expect(fileSystem.chosenFileEntry).toBeTruthy();
  });

  it("when given directory entry, returns entries", function() {
    var results = service.getDirectoryEntries(dirEntry);
    expect(results.length).toEqual(entries.length);
  });

  it("given directory entry, returns jqTree root", function() {
      var results = service.getTreeModel(dirEntry);
      console.log(results);
  });

});
