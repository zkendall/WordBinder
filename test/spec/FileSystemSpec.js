var log = console.log.bind(console);

describe("File System Directory", function() {

  // Build test file system data
  var text1 = new MockFileEntry("text1", text1_content);
  var text2 = new MockFileEntry("text2", text2_content);
  log(text1);
  var texts = [text1, text2];
  var textDir = new MockDirectoryEntry("Text", texts);
  var research1 = new MockFileEntry("research1", research1_content);
  var research2 = new MockFileEntry("research2", research2_content);
  var researches = [research1, research2];
  var researchDir = new MockDirectoryEntry("Research", researches);
  var entries = [textDir, researchDir];
  var dirEntry = new MockDirectoryEntry("root", entries);

  fileSystem = new MockChromeFileSystem(dirEntry);

  var service = new FileSystemService(fileSystem); 

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
        // When build model from file system Entries
        var results = service.getTreeModel(dirEntry);
        
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
        expect(tree.children[0].children[1].name).toEqual(text2.name);

        expect(tree.children[1].name).toEqual(researchDir.name);
        expect(tree.children[1].children[0].name).toEqual(research1.name);
        expect(tree.children[1].children[1].name).toEqual(research2.name);
    });
  });

  describe("Opening files", function() {


  });

});
