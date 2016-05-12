describe("File System Directory", function() {

  // chrome.fileSystem = new MockChromeFileSystem();

  beforeEach(function() {
    chrome.fileSystem.chosenFileEntry = {};
  });

  it("has chosenFileEntry", function() {
    expect(chrome.fileSystem.chosenFileEntry).toBeTruthy();
  });

});
