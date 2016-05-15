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

  describe("Interaction with jqTree", function() {

    beforeEach(function() {
      $('body').append('<div id="tree1"></div>');
    });

    afterEach(function() {
      // Can comment this out to see the tree in the Jasmine Spec Runner
      var $tree = $('#tree1');
      $tree.tree('destroy');
      $tree.remove();
    });
    
    it("given directory entry, returns jqTree root", function() {
        var results = service.getTreeModel(dirEntry);

        expect(results[0].label).toEqual(entries[0].name);

        $('#tree1').tree({data: results});

    });
  });

});
