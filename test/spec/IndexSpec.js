var log = console.log.bind(console);

describe("Index Service", function() {

  var parser = new MarkdownParser();
  var indexer = new IndexService(parser);

  describe("Parsing", function() {
    it("Parse research title", function() {
      var title = parser.getTitle(Content.research1_content);
      expect(title).toEqual("Bob")

       var title = parser.getTitle(Content.research2_content);
      expect(title).toEqual("Wonderland")
    });

  });

  describe("Indexing", function() {
    var fileSystem = new MockChromeFileSystem(Fixtures.dirEntry);
    var fsService = new FileSystemService(fileSystem);
    var currentModel_ = null;

    beforeEach(function(done) {
      fsService.getTreeModel(Fixtures.dirEntry, function(callbackResults) {
        currentModel_ = callbackResults;
        done();
      });
    });

    it("Given notes directory, index note titles", function() {
      indexer.index(currentModel_[1]);
      expect(indexer.getKeywords()).toEqual(["Bob", "Wonderland"]);
    });
  });

});