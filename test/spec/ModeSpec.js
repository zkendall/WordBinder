var log = console.log.bind(console);

describe("Dynamic Mode", function() {

  var mode = new DynamicMode();

  describe("Build Regex", function() {
    it("Build regex from words", function() {
      var regex = mode.buildRegex_(["test"]);
      expect(regex.toString()).toEqual(/\b(test)\b/i.toString());

      var regex = mode.buildRegex_(["test", 'thing']);
      expect(regex.toString()).toEqual(/\b(test|thing)\b/i.toString())

    });

  });

});