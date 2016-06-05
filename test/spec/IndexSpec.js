var log = console.log.bind(console);

describe("Indexing", function() {

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

});